import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config'
import { jwtDecode } from 'jwt-decode'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${API_BASE_URL}/auth`;
  private readonly tokenKey = 'jwt_token';
  private readonly decodedKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
  private userEmail: string = "";
  
  constructor(private readonly http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setUserEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  getUserEmail() {
    return this.userEmail;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userEmail = "";
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return parseInt(decoded[this.decodedKey]);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}