import { PiechartComponent } from './../../charts/piechart/piechart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule,  } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HighchartsChartModule } from "highcharts-angular";
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { ReportSiteStateComponent } from './Reports/CCO/ReportSiteState/ReportSiteState.component';
import { ReportMessagesComponent } from './Reports/Onlim/ReportMessages/ReportMessages.component';




@NgModule({
  declarations: [DashboardComponent,ReportSiteStateComponent,PiechartComponent,ReportMessagesComponent],
  exports:[DashboardComponent, ReportSiteStateComponent, ReportMessagesComponent,PiechartComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatToolbarModule,
    MatTableModule,
    RouterModule,
    MatTableExporterModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }
