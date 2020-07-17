import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import importData from 'src/App/Data/data.json';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit  {

@ViewChild(MatSort, {static: true}) sort: MatSort;


displayedColumns: string[] = ['Seite', 'Status', 'Aufrufe', 'Abspruenge'];
dataSource = importData.data;




@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

ngOnInit(): void {

  var element = {}, openItems = [];

  importData.data.forEach(function(obj){
    if(obj[1]=="geöffnet"){
      openItems.push({"Seite": obj[2],"Status": obj[1], "Aufrufe": obj[3], "Abspruenge": obj[4]});

    }
    });
    this.dataSource = new MatTableDataSource(openItems);


  this.dataSource.sort = this.sort;

  this.dataSource.paginator = this.paginator;

}

onClickMe(){
  let sessionData = JSON.parse(sessionStorage.getItem("testKey"));
  let result = JSON.parse(sessionData).data;
  this.dataSource = result;
}
}

