import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../interfaces/producto.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8000/api/productos';
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

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response as Producto[]),
      catchError(error => {
        console.error('Error fetching productos:', error);
        return throwError(() => new Error('Error fetching productos'));
      })
    );
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  private appendFormData(formData: FormData, data: any, prefix: string = ''): void {
    if (data === null || data === undefined) return;

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        this.appendFormData(formData, item, `${prefix}[${index}]`);
      });
    } else if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.appendFormData(formData, data[key], prefix ? `${prefix}[${key}]` : key);
      });
    } else {
      // Manejar explícitamente el valor booleano
      if (prefix === 'requiere_inventario') {
        // Laravel espera 1 o 0 para campos booleanos en FormData
        const booleanValue = data === true || data === 'true' || data === '1' || data === 1;
        formData.append(prefix, booleanValue ? '1' : '0');
      } else {
        formData.append(prefix, data.toString());
      }
    }
  }

  createProducto(producto: Omit<Producto, 'id' | 'created_at' | 'updated_at'>, imagen?: File): Observable<Producto> {
    const formData = new FormData();
    this.appendFormData(formData, producto);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post<Producto>(this.apiUrl, formData, { 
      headers: this.getAuthHeaders().delete('Content-Type')
    });
  }

  updateProducto(id: number, producto: Partial<Producto>, imagen?: File): Observable<Producto> {
    const formData = new FormData();
    this.appendFormData(formData, producto);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, formData, { 
      headers: this.getAuthHeaders().delete('Content-Type')
    });
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
