import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ReportService } from '../Onlimreport.service';
import * as moment from 'moment';
import 'moment/locale/de';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-ReportConversations',
  templateUrl: './ReportConversations.component.html',
  styleUrls: ['./ReportConversations.component.css']
})
export class ReportConversationsComponent implements OnInit {

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
        this.jsonData.forEach(element => {

          this.dataMap.Jan.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Januar"))
          this.dataMap.Feb.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Februar"))
          this.dataMap.Mar.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "März"))
          this.dataMap.Apr.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "April"))
          this.dataMap.May.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Mai"))
          this.dataMap.Jun.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Juni"))
          this.dataMap.Jul.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Juli"))
          this.dataMap.Aug.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "August"))
          this.dataMap.Sep.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "September"))
          this.dataMap.Oct.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Oktober"))
          this.dataMap.Nov.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "November"))
          this.dataMap.Dec.push(element["filteredData"].filter(value =>  moment(value["created_at"]).format('MMMM') === "Dezember"))
      }
      )
      this.dataMap.Jan =   this.dataMap.Jan.filter(value =>  value.length> 0)
      this.dataMap.Feb =   this.dataMap.Feb.filter(value =>  value.length> 0)
      this.dataMap.Mar =   this.dataMap.Mar.filter(value =>  value.length> 0)
      this.dataMap.Apr =   this.dataMap.Apr.filter(value =>  value.length> 0)
      this.dataMap.May =   this.dataMap.May.filter(value =>  value.length> 0)
      this.dataMap.Jun =   this.dataMap.Jun.filter(value =>  value.length> 0)
      this.dataMap.Jul =   this.dataMap.Jul.filter(value =>  value.length> 0)
      this.dataMap.Aug =   this.dataMap.Aug.filter(value =>  value.length> 0)
      this.dataMap.Sep =   this.dataMap.Sep.filter(value =>  value.length> 0)
      this.dataMap.Oct =   this.dataMap.Oct.filter(value =>  value.length> 0)
      this.dataMap.Nov =   this.dataMap.Nov.filter(value =>  value.length> 0)
      this.dataMap.Dec =   this.dataMap.Dec.filter(value =>  value.length> 0)

      this.dataMap = [
      this.dataMap.Jan.length,
     this.dataMap.Feb.length,
      this.dataMap.Mar.length,
      this.dataMap.Apr.length,
     this.dataMap.May.length,
      this.dataMap.Jun.length,
      this.dataMap.Jul.length,
     this.dataMap.Aug.length,
     this.dataMap.Sep.length,
      this.dataMap.Oct.length,
      this.dataMap.Nov.length,
      this.dataMap.Dec.length]

      this.updateChart(range,this.dataMap);
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
    this.getDailyData();
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


  getDailyData(){
    this.dataMap = {
      "h00":[],
      "h01":[],
      "h02":[],
      "h03":[],
      "h04":[],
      "h05":[],
      "h06":[],
      "h07":[],
      "h08":[],
      "h09":[],
      "h10":[],
      "h11":[],
      "h12":[],
      "h13":[],
      "h14":[],
      "h15":[],
      "h16":[],
      "h17":[],
      "h18":[],
      "h19":[],
      "h20":[],
      "h21":[],
      "h22":[],
      "h23":[],

    }
    let range=["00h", "01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"
    ]


    this.jsonData.forEach(element => {
      this.dataMap.h00.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "0"))
      this.dataMap.h01.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "1"))
      this.dataMap.h02.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "2"))
      this.dataMap.h03.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "3"))
      this.dataMap.h04.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "4"))
      this.dataMap.h05.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "5"))
      this.dataMap.h06.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "6"))
      this.dataMap.h07.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "7"))
      this.dataMap.h08.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "8"))
      this.dataMap.h09.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "9"))
      this.dataMap.h10.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "10"))
      this.dataMap.h11.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "11"))
      this.dataMap.h12.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "12"))
      this.dataMap.h13.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "13"))
      this.dataMap.h14.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "14"))
      this.dataMap.h15.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "15"))
      this.dataMap.h16.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "16"))
      this.dataMap.h17.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "17"))
      this.dataMap.h18.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "18"))
      this.dataMap.h19.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "19"))
      this.dataMap.h20.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "20"))
      this.dataMap.h21.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "21"))
      this.dataMap.h22.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "22"))
      this.dataMap.h23.push(element["filteredData"].filter(value => moment(value["created_at"]).format('H') === "23"))
    })

    this.dataMap=[
    this.dataMap.h00.filter(value => value.length > 0).length,
    this.dataMap.h01.filter(value => value.length > 0).length,
    this.dataMap.h02.filter(value => value.length > 0).length,
    this.dataMap.h03.filter(value => value.length > 0).length,
    this.dataMap.h04.filter(value => value.length > 0).length,
    this.dataMap.h05.filter(value => value.length > 0).length,
    this.dataMap.h06.filter(value => value.length > 0).length,
    this.dataMap.h07.filter(value => value.length > 0).length,
    this.dataMap.h08.filter(value => value.length > 0).length,
    this.dataMap.h09.filter(value => value.length > 0).length,
    this.dataMap.h10.filter(value => value.length > 0).length,
    this.dataMap.h11.filter(value => value.length > 0).length,
    this.dataMap.h12.filter(value => value.length > 0).length,
    this.dataMap.h13.filter(value => value.length > 0).length,
    this.dataMap.h14.filter(value => value.length > 0).length,
    this.dataMap.h15.filter(value => value.length > 0).length,
    this.dataMap.h16.filter(value => value.length > 0).length,
    this.dataMap.h17.filter(value => value.length > 0).length,
    this.dataMap.h18.filter(value => value.length > 0).length,
    this.dataMap.h19.filter(value => value.length > 0).length,
    this.dataMap.h20.filter(value => value.length > 0).length,
    this.dataMap.h21.filter(value => value.length > 0).length,
    this.dataMap.h22.filter(value => value.length > 0).length,
    this.dataMap.h23.filter(value => value.length > 0).length
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
