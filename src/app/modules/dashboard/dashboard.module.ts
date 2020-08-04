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

import { HighchartsChartModule } from 'highcharts-angular';
import { ReportSiteStateComponent } from './Reports/ReportSiteState/ReportSiteState.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [DashboardComponent,ReportSiteStateComponent, PiechartComponent],
  exports:[DashboardComponent, ReportSiteStateComponent, PiechartComponent],
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
