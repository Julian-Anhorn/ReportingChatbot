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
   this.dataMap = {"Jan":[],"Feb":[],"Mar":[],"Apr":[],"May":[],"Jun":[],"Jul":[],"Aug":[],"Sep":[],"Oct":[],"Nov":[],"Dec":[]}
   let range=["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]

   this.reportService.getAll().subscribe(data => {
     const result = data.map(item => Object.values(item));

     this.jsonData=result.map(element => ({
       filteredData: element[0].filter(value =>value["sender"]["type"]!="bot"),
     }
       ))
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


  this.jsonData.forEach(element => {

    this.dataMap.Montag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Montag"))
    this.dataMap.Dienstag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Dienstag"))
    this.dataMap.Mittwoch.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Mittwoch"))
    this.dataMap.Donnerstag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Donnerstag"))
    this.dataMap.Freitag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Freitag"))
    this.dataMap.Samstag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Samstag"))
    this.dataMap.Sonntag.push(element["filteredData"].filter(value => moment(value["created_at"]).format('dddd') === "Sonntag"))
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

     console.log(data[0].data)
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



}
     this.updateFlag = true;
     this.IsWait=false;
   }


       }
