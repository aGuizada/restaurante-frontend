import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private headers = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? 
      this.headers.set('Authorization', `Bearer ${token}`) :
      this.headers;
  }

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, 
      credentials,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  register(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/register`, 
      user,
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/user`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en AuthService:', error);
    return throwError(() => error);
  }
}
