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
  ngOnInit(): void {

  }

}
