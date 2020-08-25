import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../Onlimreport.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-ReportMissingAnswer',
  templateUrl: './ReportMissingAnswer.component.html',
  styleUrls: ['./ReportMissingAnswer.component.scss']
})
export class ReportMissingAnswerComponent implements OnInit {


dataMap=[] ;
finalData=[];

jsonData;
IsWait=true;
startDate;
endDate;
average=0.0;
displayedColumns: string[] = ['created_at','id','text'];
total=0

@ViewChild(MatSort, {static: true}) sort: MatSort;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


dataSource = new MatTableDataSource<any>();
constructor(private reportService: ReportService){
}
  ngOnInit(): void {

    this.reportService.getAll().subscribe(data => {
      const result = data.map(item => Object.values(item));

      this.jsonData=result.map(element => (

        this.dataMap.push(element[0].filter(value =>value["unanswered"]==true))

        )
        )

        this.dataMap=  this.dataMap.filter(value =>  value.length> 0)
        this.dataMap.forEach(element => {
          element[0]['created_at'] =  moment(element[0]['created_at'] ).format('DD.MM.YYYY HH:MM')
          element[0]['id'] =  element[0]['sender']['anonymous_name']

        this.finalData.push(element[0])
      });
        this.dataSource.data = this.finalData;
        this.total=this.finalData.length
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  });}}

