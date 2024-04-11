
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpHeaders
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://wrp-smarttraffic.com';
  public refreshToken!: [];

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);
    sessionStorage.setItem('bp', encodedPassword);
    sessionStorage.setItem('Izjv', encodedUsername);

    const payload = {
      auth_data: {
        uname: encodedUsername,
        ukey: encodedPassword
      }
    };

    
    

    const payloadJsonString = JSON.stringify(payload);

    const message = {
      transaction: btoa(payloadJsonString)
    };

    

    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, message).pipe(
      tap(response => {
        sessionStorage.setItem('accessToken', response.msg);
      }),
      catchError(error => {
        return throwError(error.error.msg || 'Authentication failed');
      })
    );
  }

  tokenRefresh(): Observable<any> {
    const userName = sessionStorage.getItem('uname');

    const payload = {
      auth_data: {
        uname: sessionStorage.getItem('Izjv'),
        ukey: sessionStorage.getItem('bp')
      }
    };

    const payloadJsonString = JSON.stringify(payload);

    const message = {
      transaction: btoa(payloadJsonString)
    };

    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, message).pipe(
      tap(response => {
        
      }),
      catchError(error => {
        return throwError(error.error.msg || 'Token refresh failed');
      })
    );
  }
}