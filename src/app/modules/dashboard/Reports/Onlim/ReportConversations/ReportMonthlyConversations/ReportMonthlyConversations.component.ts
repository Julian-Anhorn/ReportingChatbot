import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';
import value from '*.json';
import { DateAdapter } from '@angular/material/core';
import { element } from 'protractor';

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
startDate
endDate;
monthRange=[];
average;
total=0;
minDate = new Date(2020, 4, 28);
maxDate = new Date(Date.now());
defaultStartDate = new Date(2020, 4, 28);
yAxis:Highcharts.YAxisOptions
checked;
categories =[];
finalDataMap=[];

 constructor(private reportService: ReportService, private dateAdapter: DateAdapter<any>){
  this.yAxis ={
    title: {
      text: ''
   }}

  this.startDate= new Date(2020, 4, 28);
  this.endDate = new Date(Date.now());
  this.dateAdapter.setLocale('de');

}

ngOnInit(): void {
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
       month = moment(element[1][0]['created_at']).format('MM/01/YYYY')
       if(this.dataMap.find(item => item.Month==month)==undefined){
        this.dataMap.push({"Month":month,"Count":0})
       }
        }catch(e){
        }
        this.dataMap.find(item => item.Month==month).Count++;
      }
    )
    this.dataMap.forEach(element => {

      this.categories.push(moment(element.Month))
      this.total+=element.Count
    });
    //Monat sortieren


    this.categories= this.categories.sort((a, b) => a.valueOf() - b.valueOf())
    let finalCat=[]
    let finalData =[]
for (let index = 0; index < this.categories.length; index++) {

 let month=moment(this.categories[index]).format("MM/DD/YYYY");
   finalData.push(this.dataMap.find(item => item.Month===month).Count)
   finalCat.push(moment(month).format("MMM/YY"))
}



    this.categories=[]
    this.finalDataMap=[]
    this.categories =finalCat;
    this.finalDataMap= finalData;
    this.setAverage(finalCat)
    this.updateChart(finalCat,finalData);
  });
}
setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.startDate=moment(new Date(`${type}: ${event.value}`));
  this.endDate= new Date(Date.now());
}
setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.endDate=moment(new Date(`${type}: ${event.value}`));
  this.setDataRange()
}
setDataRange(){
    var timeValues = [];
    while (this.endDate > this.startDate || this.startDate.format('M') === this.endDate.format('M')) {
       timeValues.push(this.startDate.format('MMM/YY'));
       this.startDate.add(1,'month');
    }
this.monthRange=timeValues;
this.updateData();
}

setAverage(range){
  this.average= (this.total / range.length).toFixed(0);

}

updateData(){
  this.categories=[]
  this.finalDataMap=[]
  let newDataMap=[];
  this.total=0;
  this.monthRange.forEach(element => {
    let elm=(this.dataMap.filter(item => item.Monat==element))
if(elm!=undefined){
  newDataMap.push(elm);
}

});
  newDataMap.forEach(element => {
    if(element[0]===undefined){}else{
      this.categories.push(element[0].Monat)
      this.total+=element[0].Anzahl}
    });
  //Monat sortieren
  const finaleCat = this.categories.sort((a, b) => {
    return moment(moment(b.Monat).format("M/YY")).diff(moment(a.Monat).format("M/YY"));
  });


  let finalData =[]
  finaleCat.forEach(element => {
    finalData.push(this.dataMap.find(item => item.Monat===element).Anzahl)
  });

  this.categories =finaleCat;
  this.finalDataMap =finalData;

  this.setAverage(finaleCat)
  this.updateChart(finaleCat,finalData);
}

displayAvgLine(){
  if(this.checked){
   this.yAxis ={
     title: {
       text: ''
    },

     plotLines: [{
     color: 'white',
     dashStyle: "Dash",
     label: {
       text: this.average,
       style:{
         color:"white",
         fontSize:'15px',
         backgroundColor:"red"
       }
     },
     value: this.average,
     width: 2,
     zIndex: 2,
   }



  ]}}else{
   this.yAxis={plotLines: [{
   //   yAxis: {

   //     title: {
   //       text: ''
   //    }},
   //    legend: {
   //      enabled: false
   //  }
  }]
}}
this.updateChart(this.categories,this.finalDataMap)
}






updateChart(range,data) {
  this.chartOptions={
    rangeSelector: {
      selected: 1
  },

  exporting: {
    sourceWidth: 1000,
    sourceHeight: 600,
    scale: 1,
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
      text: "Konversationen monatlich<br>Gesamt:"+ this.total+"   \nØ"+this.average,
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
   yAxis: this.yAxis,
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

legend: {
  enabled: false
},


}
  this.updateFlag = true;
  this.IsWait=false;
}


    }

