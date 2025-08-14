import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

interface Role {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  private headers = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token ? 
      this.headers.set('Authorization', `Bearer ${token}`) :
      this.headers;
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/users`, 
      user,
      { headers: this.getAuthHeaders() }
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/users`,
      { headers: this.getAuthHeaders() }
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/users/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/users/${id}`,
      user,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/users/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${this.apiUrl}/roles`,
      { headers: this.getAuthHeaders() }
    );
  }
}
