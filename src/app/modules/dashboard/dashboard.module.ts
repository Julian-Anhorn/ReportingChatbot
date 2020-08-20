import { PiechartComponent } from './../../charts/piechart/piechart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule,  } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HighchartsChartModule } from "highcharts-angular";
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { ReportSiteStateComponent } from './Reports/CCO/ReportSiteState/ReportSiteState.component';
import { ReportMessagesComponent } from './Reports/Onlim/ReportMessages/ReportMessages.component';
import { ReportConversationsComponent } from './Reports/Onlim/ReportConversations/ReportConversations.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';




@NgModule({
  declarations: [DashboardComponent,ReportSiteStateComponent,PiechartComponent,ReportConversationsComponent,ReportMessagesComponent],
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
    MatProgressSpinnerModule,
    MatTableExporterModule,
    HighchartsChartModule,
    MatNativeDateModule,
    MatDatepickerModule,

MatSelectModule
  ],providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class DashboardModule { }
