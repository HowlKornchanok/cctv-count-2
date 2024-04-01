import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private apiUrl = 'https://150.95.31.129';

  constructor(private http: HttpClient) {}

  getStationData(): Observable<any> {
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


    

    // Make POST request to the API endpoint
    return this.http.post<any>(`${this.apiUrl}/api/data_view/get_station_data`,requestBody, { headers }).pipe(
      tap(response => {
        console.log('Server response:', response);
      }),
      catchError(error => {
        // Handle error
        return throwError(error.error.msg || 'Failed to get station data');
      })
    );
  }
}
