
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ValidateService } from './validate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl1 = 'https://150.95.31.129';
  private apiUrl0 = 'https://150.95.31.129';

  constructor(
    private http: HttpClient,
    private validateService: ValidateService) { }

  login(username: string, password: string): Observable<any> {
    // Encode username and password to Base64
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);

    // Construct payload
    const payload = {
      auth_data: {
        uname: encodedUsername,
        ukey: encodedPassword
      }
    };

    const UserPayload = {
      auth_data:{
        uname: encodedUsername
      }
    }

    // Convert payload to JSON string
    const payloadJsonString = JSON.stringify(payload);
    const UserPayloadJsonString = JSON.stringify(UserPayload);
    // Construct the message object with the required format
    const message = {
      transaction: btoa(payloadJsonString)
    };

    const userMessage = {
      transaction: btoa(UserPayloadJsonString)
    }

    

    // Make HTTP POST request to login
    return this.http.post<any>(`${this.apiUrl1}/api/auth/login`, message).pipe(
      catchError(error => {
        // Handle authentication failure
        return throwError(error.error.msg || 'Authentication failed');
      }),
     
    );
  }



  getUserData(username: string, password: string, token: string): Observable<any> {
    // Construct payload for getting user data
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);
    const payload = {
      auth_data: {
        uname: encodedUsername,
        ukey: encodedPassword
      }
    };

    // Convert payload to JSON string
    const payloadJsonString = JSON.stringify(payload);

    // Construct the message object with the required format
    const message = {
      transaction: btoa(payloadJsonString)
    };

    // Set the Authorization header with the bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP POST request to get user data with headers
    return this.http.post<any>(`${this.apiUrl1}/api/auth/get_user_data`, message, { headers }).pipe(
      catchError(error => {
        // Handle error
        return throwError(error.error.msg || 'Failed to get user data');
      })
    );
  }

  validateToken(token: string): Observable<any> {
    return this.validateService.validateToken(token);
  }
}