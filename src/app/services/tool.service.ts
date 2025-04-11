import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config'

@Injectable({ providedIn: 'root' })
export class ToolService {
  private readonly baseUrl = `${API_BASE_URL}/tool`;

  constructor(private readonly http: HttpClient) {}

  getAvailableTools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  borrowTool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/borrow`, data);
  }

  returnTool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/return`, data);
  }

  addTool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }
}