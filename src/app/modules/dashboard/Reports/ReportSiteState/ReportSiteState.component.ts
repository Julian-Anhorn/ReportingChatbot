import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {pipe, Observable} from "rxjs";
import { ReportService } from '../report.service';
import { map } from 'rxjs/operators';
import { FunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-ReportSiteState',
  templateUrl: './ReportSiteState.component.html',
  styleUrls: ['./ReportSiteState.component.css']
})
export class ReportSiteStateComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  displayedColumns: string[] = ['Seite', 'Status', 'Aufrufe', 'Abspruenge'];
  dataSource = new MatTableDataSource<any>();


  constructor(private reportService: ReportService){
  }


  ngOnInit(): void {

    this.reportService.getById(1).subscribe(data => {
      console.log(data)
    })


    this.reportService.getAll().subscribe(data => {

          let openItems = [];

          data.forEach(function(innerObj){
            if(innerObj[1]=="geöffnet"){

              openItems.push({"Seite": innerObj[2],"Status": innerObj[1], "Aufrufe": innerObj[3], "Abspruenge": innerObj[4]});
            }
            });
        this.dataSource.data = openItems;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });


  }

  }
