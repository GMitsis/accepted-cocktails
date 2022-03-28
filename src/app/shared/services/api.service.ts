import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private httpClient: HttpClient
  ) { }

  // private setHeaders(): HttpHeaders {
  //   const config = {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json'
  //   };

  //   return new HttpHeaders(config);
  // }

  get(path: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(`${path}`, { params });
  }
}
