import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { LowdbAsync } from 'lowdb';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';



@Injectable({
  providedIn: 'root'
})
export class ReportService {



  baseURL = "http://localhost:3000";


  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseURL+"/data");
  }
 // HttpClient API post() method => Create employee
 postData(employee:any): Observable<any> {
  const headers = { 'content-type': 'application/json'}
  const body=employee;
  return this.httpClient.post<any>(this.baseURL+"/data", body,{'headers':headers})
}
getById(id:number ): Observable<any> {
 return this.httpClient.get(this.baseURL)

}

deleteAll(id:number): Observable<any[]>{

  return this.httpClient.delete<any[]>("http://localhost:3000/data/1");
}

handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
  } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return errorMessage;
}
}
