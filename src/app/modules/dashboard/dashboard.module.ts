import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [DashboardComponent, TableComponent],
  exports:[DashboardComponent, TableComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class DashboardModule { }
