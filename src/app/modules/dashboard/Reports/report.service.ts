import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseURL = "http://localhost:3000/data";

   // Http Options
   httpOptions = {


  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseURL);
  }
 // HttpClient API post() method => Create employee
 postData(employee:any): Observable<any> {
  const headers = { 'content-type': 'application/json'}
  const body=employee;
  return this.httpClient.post(this.baseURL, body,{'headers':headers})
}
getById(id:number ): Observable<any> {
  id=1;
  return this.httpClient.get<any>(`${this.baseURL}/${id}`);
}

delete(): Observable<any[]>{
  console.log("los");
  return this.httpClient.delete<any[]>("http://localhost:3000/data/1");
}
}
