import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../app.config'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl = `${API_BASE_URL}/notifications`;

  constructor(private readonly http: HttpClient) {}

  OverdueToolNotification(): void {
    this.http.get(`${this.baseUrl}/overdue-tool-notification`)
    .subscribe({
      next: response => {
        alert("Overdue Notification completed, review email queue table")
      },
      error: error => {
        alert('Error fetching overdue tool notification:');
        console.log(error);
      }
    });
  }
}
