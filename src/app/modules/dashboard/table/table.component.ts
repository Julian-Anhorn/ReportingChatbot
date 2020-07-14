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

result = importData.data;
displayedColumns: string[] = ['Seite', 'Status', 'Aufrufe', 'Absprünge'];
dataSource = this.result;
@ViewChild(MatSort, {static: true}) sort: MatSort;


ngOnInit(): void {
  this.dataSource.sort = this.sort;
  console.log(this.sort)
}

}

