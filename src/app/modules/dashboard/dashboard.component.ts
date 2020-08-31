import { Component, OnInit } from '@angular/core';
import sampleData from 'src/app/Data/data.json';
import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import * as Highcharts from 'highcharts';
import theme from 'highcharts/themes/dark-unica';
theme(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}




/**
 * @title Basic use of `<table mat-table>`
 */

export class TableBasicExample {

}
