import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReportService } from '../Onlimreport.service';
import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { timeout } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/de';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-ReportMessages',
  templateUrl: './ReportMessages.component.html',
  styleUrls: ['./ReportMessages.component.css']
})


export class ReportMessagesComponent implements OnInit {

  dataMap = {'Total': 0,'Jan': 0,'Feb': 0,'Mar': 0,'Apr': 0,'May': 0,'Jun': 0,'Jul': 0,'Aug': 0,'Sep': 0,'Oct': 0,'Nov': 0,'Dec': 0};
  range = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  Highcharts: typeof Highcharts = Highcharts;

  newData;
  updateFlag = false;
  chartOptions: Options;
  IsWait = true;


  constructor(private reportService: ReportService){

  }

  ngOnInit(): void {
    this.reportService.getAll().subscribe(data => {
      const result = data.map(item => Object.values(item));

      this.newData = result.map(element => ({
        filteredData: element[1].filter(value => value['sender']['type'] !='bot'),
      }
        ));
      this.newData.forEach(element => {
            this.dataMap.Total +=  element['filteredData'].length;
            this.dataMap.Jan +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Januar').length;
            this.dataMap.Feb +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Februar').length;
            this.dataMap.Mar +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'März').length;
            this.dataMap.Apr +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'April').length;
            this.dataMap.May +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Mai').length;
            this.dataMap.Jun +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Juni').length;
            this.dataMap.Jul +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Juli').length;
            this.dataMap.Aug +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'August').length;
            this.dataMap.Sep +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'September').length;
            this.dataMap.Oct +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Oktober').length;
            this.dataMap.Nov +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'November').length;
            this.dataMap.Dec +=  element['filteredData'].filter(value =>  moment(value['created_at']).format('MMMM') === 'Dezember').length;
      }
      );
      this.updateChart(this.range,'');
    });
  }
changeColor(){

}


    updateChart(range, data) {

      this.chartOptions = {
        rangeSelector: {
          selected: 1
      },
      exporting: {
        sourceWidth: 800,
        sourceHeight: 400,
        scale: 1
    },

        title: {
          text: 'Gesamt:'+ this.dataMap.Total,
          align: 'center'},
        xAxis: {
          labels: {
            style: {
                fontSize: '15px'
            }},
          categories: range,
          crosshair: true

       },
       yAxis: {
        title: {
          text: ''
       }},
       series: [
        {
          name: 'Anzahl',
          type: 'area',
          data: [this.dataMap.Jan, this.dataMap.Feb, this.dataMap.Mar, this.dataMap.Apr, this.dataMap.May, this.dataMap.Jun, this.dataMap.Jul, this.dataMap.Aug, this.dataMap.Sep, this.dataMap.Oct, this.dataMap.Nov, this.dataMap.Dec],
          color: '#774251',

        //  data:[data.Jan.length,data.Feb.length,data.Mar.length,data.Apr.length,data.May.length,data.Jun.length,data.Jul.length,data.Aug.length,data.Sep.length,data.Oct.length,data.Nov.length,data.Dec.length]
      }
    ],

          };


      this.updateFlag = true;
      this.IsWait = false;
}


    }

