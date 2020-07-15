import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import importData from 'src/App/Data/data.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
@ViewChild(MatSort, {static: true}) sort: MatSort;



displayedColumns: string[] = ['Seite', 'Status', 'Aufrufe', 'Absprünge'];
dataSource="";


ngOnInit(): void {
}
onClickMe(){
  let sessionData = JSON.parse(sessionStorage.getItem("testKey"));
  let result = JSON.parse(sessionData).data;
  this.dataSource = result;
}
}

