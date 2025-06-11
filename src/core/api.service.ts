import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  // GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, {topic:data}).pipe(
      catchError(this.handleError)
    );
  }

  // // PUT
  // put<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // // DELETE
  // delete<T>(endpoint: string): Observable<T> {
  //   return this.http.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Global error handler
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
