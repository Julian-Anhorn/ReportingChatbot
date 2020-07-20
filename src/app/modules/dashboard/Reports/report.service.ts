import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  readonly baseUrl = 'http://localhost:3000/data';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

}
