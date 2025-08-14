import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Almacen } from '../interfaces/almacen.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
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

  // Obtener todos los almacenes
  getAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(`${this.apiUrl}/almacenes`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response as Almacen[]),
      catchError(error => {
        console.error('Error fetching almacenes:', error);
        return throwError(() => new Error('Error fetching almacenes'));
      })
    );
  }

  // Obtener un almacen por ID
  getAlmacen(id: number): Observable<Almacen> {
    return this.http.get<Almacen>(`${this.apiUrl}/almacenes/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo almacen
  createAlmacen(almacen: Omit<Almacen, 'id'>): Observable<Almacen> {
    return this.http.post<Almacen>(`${this.apiUrl}/almacenes`, almacen, { headers: this.getAuthHeaders() });
  }

  // Actualizar un almacen
  updateAlmacen(id: number, almacen: Partial<Almacen>): Observable<Almacen> {
    return this.http.put<Almacen>(`${this.apiUrl}/almacenes/${id}`, almacen, { headers: this.getAuthHeaders() });
  }

  // Eliminar un almacen
  deleteAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/almacenes/${id}`, { headers: this.getAuthHeaders() });
  }

}
