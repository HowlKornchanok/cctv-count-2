
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ValidateService } from './validate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://wrp-smarttraffic.com';
  

  constructor(
    private http: HttpClient,
    private validateService: ValidateService) { }

  login(username: string, password: string): Observable<any> {
    // Encode username and password to Base64
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);
    sessionStorage.setItem('bp',encodedPassword);

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
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, message).pipe(
      catchError(error => {
        // Handle authentication failure
        return throwError(error.error.msg || 'Authenticationsssss failed');
      }),
     
    );
  }



  validateToken(token: string): Observable<any> {
    return this.validateService.validateToken(token);
  }
}