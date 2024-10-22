import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-ReportDailyConversations',
  templateUrl: './ReportDailyConversations.component.html',
  styleUrls: ['./ReportDailyConversations.component.css']
})
export class ReportDailyConversationsComponent implements OnInit {

  //dataMap = {"Total":0,"Jan":0,"Feb":0,"Mar":0,"Apr":0,"May":0,"Jun":0,"Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0}
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
 startDate;
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


 constructor(private reportService: ReportService, private dateAdapter: DateAdapter<any>)
 {
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

    this.jsonData=result
    let day;

    this.jsonData.forEach(element => {
        try{
       day = moment(element[1][0]['created_at']).format('dddd')
       if(this.dataMap.find(item => item.Day==day)==undefined){
        this.dataMap.push({"Day":day,"Count":0})
       }
        }catch(e){
        }
        this.dataMap.find(item => item.Day==day).Count++;
      }
    )
    this.dataMap.forEach(element => {
      this.categories.push(element.Day)
      this.total+=element.Count
    });
    this.categories=["Montag","Dienstag","Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]


    let finalData =[]
    this.categories.forEach(element => {
      finalData.push(this.dataMap.find(item => item.Day===element).Count)
    });

    this.finalDataMap=[]
    this.finalDataMap= finalData;
    this.setAverage()
    this.updateChart(this.categories,finalData);

  });
}
setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {

  this.startDate=moment(new Date(`${type}: ${event.value}`));
  this.endDate= new Date(Date.now());
}
setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.endDate=moment(new Date(`${type}: ${event.value}`));
  this.updateData()
}
updateData(){
  this.total=0;
  let day;
  this.dataMap=[]
  this.jsonData.forEach(element => {
    try{

   let timestamp=new Date(element[1][0]['created_at']);
   //+1 Tag sonst wird 00:00Uhr von EndDay ausgewählt und der endTag nicht mitgezählt
   this.endDate = new Date( this.endDate + ( 3600 * 1000 * 24))


   if((timestamp >= this.startDate) && (timestamp <= this.endDate)){
      day = moment(element[1][0]['created_at']).format('dddd')
      if(this.dataMap.find(item => item.Day==day)==undefined){
        this.dataMap.push({"Day":day,"Count":0})
      }

      this.dataMap.find(item => item.Day==day).Count++;

  } }catch(e){
  }
}
);
  this.dataMap.forEach(element => {
  this.total+=element.Count
});
  this.categories=["Montag","Dienstag","Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

  let finalData =[]
  this.categories.forEach(element => {
  let elm = this.dataMap.find(item => item.Day===element)
  if(elm!=undefined){
    finalData.push(elm.Count)

  }
});
  let finalCat=[]
  this.categories.forEach(element => {
    if(this.dataMap.find(item => item.Day===element)!=undefined){
      finalCat.push(element)

    }
});
  this.categories = finalCat;
  this.finalDataMap= finalData;
  this.setAverage()
  this.updateChart(this.categories,finalData);
}


// setAverage(){
//   var diffDays = moment(this.endDate).diff(moment(this.startDate), 'days');
//   this.average= (this.total / diffDays).toFixed(0);

// }


setAverage(){
  var arr = [];
  console.log(this.endDate)
  // Get "next" monday
  let tmp = moment(this.startDate).clone().day(1);
  if( tmp.isAfter(this.startDate, 'd') ){
    arr.push(tmp.format('YYYY-MM-DD'));
  }
  while( tmp.isSameOrAfter(this.endDate) ){
    tmp.add(7, 'days');
    arr.push(tmp.format('YYYY-MM-DD'));
  }
  console.log(arr);
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
  console.log(data)
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
        text: "Konversationen wöchentlich<br>Gesamt:"+ this.total+"   \nØ"+this.average,
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

