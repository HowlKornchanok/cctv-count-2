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
    const accessToken = sessionStorage.getItem('accessToken');
    const transactionBody = sessionStorage.getItem('UserTransaction');
    console.log('accessToken: ', accessToken);
    console.log('transaction body: ', transactionBody);
    if (!accessToken || !transactionBody) {
      // Handle case where access token or transaction key is not available
      return throwError('Access token or transaction key not found in session storage');
    }

    // Set the Authorization header with the access token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    // Make HTTP POST request to get user list with headers and transaction key as the body
    return this.http.post<any>(`${this.apiUrl}/api/data_view/get_user_list`, JSON.parse(transactionBody), { headers }).pipe(
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
