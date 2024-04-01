import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9003';

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    // Retrieve transaction key from session storage
    const userToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('uname');
    // Check if username is not null before encoding
    const encodedUsername = username ? btoa(username) : '';

    // Construct the request payload
    const payload = {
      id: '',
      auth_data: {
        uname: encodedUsername
      },
      detail: {
      }
    };

    const jsonString = JSON.stringify(payload);
    const encodedPayload = btoa(jsonString);
    const requestBody = {
      transaction: encodedPayload
    };


    // Set headers including the user token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });

    // Make HTTP POST request to get user list with headers and transaction key as the body
    return this.http.post<any>(`${this.apiUrl}/api/data_view/get_user_list`, requestBody, { headers }).pipe(
      tap(response => {
        console.log('Server response:', response);
      }),
      catchError(error => {
        // Handle error
        return throwError(error.error.msg || 'Failed to get user list');
      })
    );
  }
}
