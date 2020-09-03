import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';
import value from '*.json';
import { style } from '@angular/animations';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-ReportHourlyConversations',
  templateUrl: './ReportHourlyConversations.component.html',
  styleUrls: ['./ReportHourlyConversations.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ReportHourlyConversationsComponent implements OnInit {

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
     let hour;

     this.jsonData.forEach(element => {
         try{
        hour = moment(element[1][0]['created_at']).format('HH')
        hour=hour+"h"

        if(this.dataMap.find(item => item.Hour==hour)==undefined){
         this.dataMap.push({"Hour":hour,"Count":0})
        }
         }catch(e){
         }
         this.dataMap.find(item => item.Hour==hour).Count++;
       }
     )
     this.dataMap.forEach(element => {
       this.categories.push(element.Hour)
       this.total+=element.Count
     });
     console.log( this.dataMap)
     this.categories=["00h", "01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"]


     let finalData =[]
     this.categories.forEach(element => {
       finalData.push(this.dataMap.find(item => item.Hour===element).Count)
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
   console.log(this.endDate)
   this.updateData()
 }
 updateData(){
   this.total=0;
   let day;
   let hour;
   this.dataMap=[]
   this.jsonData.forEach(element => {
     try{

    let timestamp=new Date(element[1][0]['created_at']);
    //+1 Tag sonst wird 00:00Uhr von EndDay ausgewählt und der Tag nicht mitgezählt
    this.endDate = new Date( this.endDate + ( 3600 * 1000 * 24))


    if((timestamp >= this.startDate) && (timestamp <= this.endDate)){
       day = moment(element[1][0]['created_at']).format('dddd')
       hour = moment(element[1][0]['created_at']).format('HH')
       hour=hour+"h"
       if(this.dataMap.find(item => item.Hour==hour)==undefined){
         this.dataMap.push({"Hour":hour,"Count":0})
       }

       this.dataMap.find(item => item.Hour==hour).Count++;

   } }catch(e){
   }
 }
 );
   this.dataMap.forEach(element => {
   this.total+=element.Count
 });
 this.categories=["00h", "01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"]

   console.log(this.dataMap);
   let finalData =[]
   this.categories.forEach(element => {
   let elm = this.dataMap.find(item => item.Hour===element)
   if(elm!=undefined){
     finalData.push(elm.Count)
   }
   {
    finalData.push(0)
   }
 });
//    let finalCat=[]
//    console.log(this.dataMap)
//    this.categories.forEach(element => {
//      if(this.dataMap.find(item => item.Hour===element)!=undefined){
//        finalCat.push(element)
//      }
//      else{
//       finalCat.push(element)
//      }
//  });

  //  this.categories = finalCat;
   this.finalDataMap= finalData;
   this.setAverage()
   this.updateChart(this.categories,finalData);
 }


 setAverage(){
   var diffDays = moment(this.endDate).diff(moment(this.startDate), 'days');
   this.average= (this.total / diffDays).toFixed(0);

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

