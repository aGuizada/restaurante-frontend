import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8000/api/categorias';
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

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response as Categoria[]),
      catchError(error => {
        console.error('Error fetching categorias:', error);
        return throwError(() => new Error('Error fetching categorias'));
      })
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createCategoria(categoria: Omit<Categoria, 'id'>): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria, { headers: this.getAuthHeaders() });
  }

  updateCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria, { headers: this.getAuthHeaders() });
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
