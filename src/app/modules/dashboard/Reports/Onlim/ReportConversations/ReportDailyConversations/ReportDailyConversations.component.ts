import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';


@Component({
  selector: 'app-ReportDailyConversations',
  templateUrl: './ReportDailyConversations.component.html',
  styleUrls: ['./ReportDailyConversations.component.css']
})
export class ReportDailyConversationsComponent implements OnInit {

  //dataMap = {"Total":0,"Jan":0,"Feb":0,"Mar":0,"Apr":0,"May":0,"Jun":0,"Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0}
 dataMap ;
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

 constructor(private reportService: ReportService){
 }

 ngOnInit(): void {

   this.reportService.getAll().subscribe(data => {
     const result = data.map(item => Object.values(item));

     this.jsonData=result
      this.getWeekData();

   });
 }
 setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
   this.startDate=new Date(`${type}: ${event.value}`);
 }
 setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
   this.endDate=new Date(`${type}: ${event.value}`);
   console.log(this.startDate+"-"+this.endDate)
   this.updateData()
 }
 updateData(){
   this.getWeekData();
 }

 getWeekData(){
  this.dataMap = {"Montag":[],"Dienstag":[],"Mittwoch":[],"Donnerstag":[],"Freitag":[],"Samstag":[],"Sonntag":[]}
  let range=["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]




    let day;
    this.jsonData.forEach(element => {
      try{
        day = moment(element[1][0]['created_at']).format('dddd')
      }catch(e){

      }
      switch (day) {
        case 'Montag':
          this.dataMap.Montag.push(element)
          break;
        case 'Dienstag':
          this.dataMap.Dienstag.push(element)
          break;
        case 'Mittwoch':
          this.dataMap.Mittwoch.push(element)
          break;
        case 'Donnerstag':
          this.dataMap.Donnerstag.push(element)
          break;
        case 'Freitag':
          this.dataMap.Freitag.push(element)
          break;
        case 'Samstag':
          this.dataMap.Samstag.push(element)
          break;
        case 'Sonntag':
          this.dataMap.Sonntag.push(element)
          break;
        default:
      }
  })

  this.dataMap=[
  this.dataMap.Montag.filter(value => value.length > 0).length,
  this.dataMap.Dienstag = this.dataMap.Dienstag.filter(value => value.length > 0).length,
  this.dataMap.Mittwoch = this.dataMap.Mittwoch.filter(value => value.length > 0).length,
  this.dataMap.Donnerstag = this.dataMap.Donnerstag.filter(value => value.length > 0).length,
  this.dataMap.Freitag = this.dataMap.Freitag.filter(value => value.length > 0).length,
  this.dataMap.Samstag = this.dataMap.Samstag.filter(value => value.length > 0).length,
  this.dataMap.Sonntag = this.dataMap.Sonntag.filter(value => value.length > 0).length
  ]

  this.updateChart(range,this.dataMap)

}


   updateChart(range,data) {

     this.chartOptions={
       rangeSelector: {
         selected: 1
     },

       title: {
         text: "Gesamt:"+ this.jsonData.length,
         align: 'center'},
         exporting: {
           buttons: {
             contextButton: {
               symbolStroke: '#efefef',
               theme: {
                 fill: 'grey'
               }
             }
           }
         },
         xAxis:{
          offset:0,


          labels: {

            style: {
                fontSize:'15px'
            }},
          categories:range,
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
  legend: {
    enabled: false
  },



}
     this.updateFlag = true;
     this.IsWait=false;
   }


       }
