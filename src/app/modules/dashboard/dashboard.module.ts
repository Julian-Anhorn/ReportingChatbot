import { PiechartComponent } from './../../charts/piechart/piechart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule,  } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HighchartsChartModule } from 'highcharts-angular'




@NgModule({
  declarations: [DashboardComponent, TableComponent, PiechartComponent],
  exports:[DashboardComponent, TableComponent, PiechartComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatToolbarModule,
    MatTableModule,
    RouterModule,
    HighchartsChartModule
  ]
})
export class DashboardModule { }
