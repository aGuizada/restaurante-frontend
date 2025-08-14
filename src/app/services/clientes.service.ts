import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
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

  // Get all clients
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response as Cliente[]),
      catchError(error => {
        console.error('Error fetching clientes:', error);
        return throwError(() => new Error('Error fetching clientes'));
      })
    );
  }

  // Get client by ID
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/${id}`, { headers: this.getAuthHeaders() });
  }

  // Create new client
  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente, { headers: this.getAuthHeaders() });
  }

  // Update client
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${id}`, cliente, { headers: this.getAuthHeaders() });
  }

  // Delete client
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`, { headers: this.getAuthHeaders() });
  }
}
