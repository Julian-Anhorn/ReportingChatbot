import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';
import value from '*.json';

@Component({
  selector: 'app-ReportMonthly',
  templateUrl: './ReportMonthlyConversations.component.html',
  styleUrls: ['../ReportConversations.component.css']
})
export class ReportMothlyConversationsComponent implements OnInit {
dataMap=[] ;
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});

Highcharts: typeof Highcharts = Highcharts;
jsonData;
updateFlag = false;
chartOptions: Highcharts.Options


IsWait=true;
toppings = new FormControl();
startDate;
endDate;
monthRange=[];
average;
total=0;
constructor(private reportService: ReportService){
}

ngOnInit(): void {
  this.dataMap = []
  let categories=[]

  this.reportService.getAll().subscribe(data => {
    const result = data.map(item => Object.values(item));

    // this.jsonData=result.map(element => ({
    //   filteredData: element[0].filter(value =>value["sender"]["type"]!="bot"),
    // }
      // ))


      this.jsonData=result
      let month;
      this.jsonData.forEach(element => {
        try{
       month = moment(element[1][0]['created_at']).format('MMM/YY')

       if(this.dataMap.find(item => item.Monat==month)==undefined){
        this.dataMap.push({"Monat":month,"Anzahl":0})
       }
        }catch(e){
        }

        this.dataMap.find(item => item.Monat==month).Anzahl++;
      }
    )
    this.dataMap.forEach(element => {
      categories.push(element.Monat)
      this.total+=element.Anzahl
    });
    //Monat sortieren
    const finaleCat = categories.sort((a, b) => {
      return moment(moment(b.Monat).format("M/YY")).diff(moment(a.Monat).format("M/YY"));
    });

    finaleCat.reverse();


    let finalData =[]
    finaleCat.forEach(element => {
      finalData.push(this.dataMap.find(item => item.Monat===element).Anzahl)
    });


    this.setAverage()
    this.updateChart(finaleCat,finalData);

  });
}
setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.startDate=moment(new Date(`${type}: ${event.value}`));

}
setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.endDate=moment(new Date(`${type}: ${event.value}`));
  console.log(this.startDate+"-"+this.endDate)
  this.setDataRange()
}
setDataRange(){
    var timeValues = [];
    while (this.endDate > this.startDate || this.startDate.format('M') === this.endDate.format('M')) {
       timeValues.push(this.startDate.format('MMM/YY'));
       this.startDate.add(1,'month');
    }
this.monthRange=timeValues;
console.log(this.monthRange)
this.updateData();
}

setAverage(){
  let start = moment(this.startDate, "YYYY-MM-DD");
  let end = moment(this.endDate, "YYYY-MM-DD");
  //Difference in number of days
  let duration=moment.duration(start.diff(end)).asMonths();
  this.average= (this.total / duration *-1).toFixed(0);
}

updateData(){
  let newDataMap=[];
  this.total=0;
  this.monthRange.forEach(element => {
    let elm=(this.dataMap.filter(item => item.Monat==element))
if(elm!=undefined){
  newDataMap.push(elm);
}

});
  let categories=[];
  newDataMap.forEach(element => {
    if(element[0]===undefined){}else{
      categories.push(element[0].Monat)
      this.total+=element.Anzahl}
    });
  //Monat sortieren
  const finaleCat = categories.sort((a, b) => {
    return moment(moment(b.Monat).format("M/YY")).diff(moment(a.Monat).format("M/YY"));
  });


  let finalData =[]
  finaleCat.forEach(element => {
    finalData.push(newDataMap.find(item => item[0].Monat===element)[0].Anzahl)
  });

console.log(finalData)
  this.setAverage()
  this.updateChart(finaleCat,finalData);
}

updateChart(range,data) {
console.log(data)
  this.chartOptions={
    rangeSelector: {
      selected: 1
  },
  exporting: {
    chartOptions: { // specific options for the exported image
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        }
    },
    fallbackToExportServer: false
},
    title: {
      text: "Gesamt:"+ this.total+"   \nØ:"+this.average+"/Monat",
      align: 'center'},

    xAxis:{
      type: "category",

      labels: {
        style: {
            fontSize:'15px'
        }},
        categories:range, // categories
        crosshair: true

   },
   yAxis: {
    title: {
      text: ''
   }},
   series: [
    {
      name:'Anzahl',
      type: 'area',

      data: data,


      color: "#774251",

    //  data:[data.Jan.length,data.Feb.length,data.Mar.length,data.Apr.length,data.May.length,data.Jun.length,data.Jul.length,data.Aug.length,data.Sep.length,data.Oct.length,data.Nov.length,data.Dec.length]
  }
],

credits: {
  enabled: false
},



}
  this.updateFlag = true;
  this.IsWait=false;
}


    }

