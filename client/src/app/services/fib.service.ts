import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FibService {

  private baseUrl = '/api'; // Nginx will route this

  constructor(private http: HttpClient) { }

  getAllIndices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/values/all`);
  }

  getCurrentValues(): Observable<any> {
    return this.http.get(`${this.baseUrl}/values/current`);
  }

  submitIndex(index: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/values`, { index });
  }
}
