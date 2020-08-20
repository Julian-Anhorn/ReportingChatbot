import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { ReportService } from '../../Onlimreport.service';

@Component({
  selector: 'app-ReportMonthly',
  templateUrl: './ReportMonthlyConversations.component.html',
  styleUrls: ['./ReportMonthlyConversations.component.css']
})
export class ReportMothlyConversationsComponent implements OnInit {
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

