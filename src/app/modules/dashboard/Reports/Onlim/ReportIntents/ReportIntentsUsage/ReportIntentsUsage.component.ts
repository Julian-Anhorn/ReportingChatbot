import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReportService } from '../../Onlimreport.service';
import * as moment from 'moment';
import { Options } from 'highcharts';

@Component({
  selector: 'app-ReportIntentsUsage',
  templateUrl: './ReportIntentsUsage.component.html',
  styleUrls: ['./ReportIntentsUsage.component.scss']
})
export class ReportIntentsUsageComponent implements OnInit {

//dataMap = {"Total":0,"Jan":0,"Feb":0,"Mar":0,"Apr":0,"May":0,"Jun":0,"Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0}
dataMap ;
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});

chartOptions: {};
Highcharts = Highcharts;
jsonData;
updateFlag = false;

IsWait=true;
toppings = new FormControl();
startDate;
endDate;
average=0.0;
nData=[]
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
        element["filteredData"].forEach(innerElement => {
          this.nData.push(innerElement["intent_uid"])

        });


      })


      var counts=[]
      var finalData = []
      this.nData.forEach(function(x) {

        if((counts.some(item => item.name == ""+x+"") == false)){
          var temp ={name:x, y:0}
          counts.push(temp)
        }
        if(x != null){
          counts.find(item => item.name == ""+x+"").y+=1
        }

      });
      ;
      counts.sort((a, b) => (a.y > b.y) ? 1 : -1)

    this.updateChart(range,counts);
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
setAverage(){
  this.average=2.2;
}

updateData(){

}

updateChart(range,data) {
  data= data.slice(data.length-10, data.length+1);


  var pieColors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.color(base).brighten((i - 8) / 7).get());
    }
    return colors;
}());




  this.chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Top-10 URL´s'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,

            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',

            }
        }
    },
    credits: {
      enabled:false,
    },
    exporting: {
      enabled:true,
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: (data)
    }]
};
}}
