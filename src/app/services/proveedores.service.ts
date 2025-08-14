import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Proveedor } from '../interfaces/proveedor.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
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

  // Obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/proveedores`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response as Proveedor[]),
      catchError(error => {
        console.error('Error fetching proveedores:', error);
        return throwError(() => new Error('Error fetching proveedores'));
      })
    );
  }

  // Obtener un proveedor por ID
  getProveedor(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/proveedores/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo proveedor
  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${this.apiUrl}/proveedores`, proveedor, { headers: this.getAuthHeaders() });
  }

  // Actualizar un proveedor
  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/proveedores/${id}`, proveedor, { headers: this.getAuthHeaders() });
  }

  // Eliminar un proveedor
  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/proveedores/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener productos de un proveedor
  getProductosProveedor(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proveedores/${id}/productos`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching productos del proveedor:', error);
        return throwError(() => new Error('Error fetching productos del proveedor'));
      })
    );
  }

  // Obtener productos con inventario de un proveedor
  getProductosConInventario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proveedores/${id}/productos-con-inventario`);
  }

  // Obtener compras de un proveedor
  getComprasProveedor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proveedores/${id}/compras`);
  }
}
