import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
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

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(
      `${this.apiUrl}/roles`,
      { headers: this.getAuthHeaders() }
    );
  }

  getRole(id: number): Observable<Role> {
    return this.http.get<Role>(
      `${this.apiUrl}/roles/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(
      `${this.apiUrl}/roles`,
      role,
      { headers: this.getAuthHeaders() }
    );
  }

  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(
      `${this.apiUrl}/roles/${id}`,
      role,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/roles/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }
}
