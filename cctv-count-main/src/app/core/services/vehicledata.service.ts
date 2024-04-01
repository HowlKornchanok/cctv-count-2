import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  private apiUrl = 'http://localhost:9003/api/data_view/get_vehicle_data'; 

  constructor(private http: HttpClient) {}

  getVehicleData(startTime: string, endTime: string): Observable<any> {
    // Retrieve user token from session storage
    const userToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('uname');
    // Check if username is not null before encoding
    const encodedUsername = username ? btoa(username) : '';
    console.log(startTime , 'to', endTime);
    // Encode start time and end time to Base64
    const encodedStartTime = btoa(startTime);
    const encodedEndTime = btoa(endTime);

    // Construct the request payload
    const payload = {
      id: '',
      auth_data: {
        uname: encodedUsername
      },
      detail: {
        st_time: encodedStartTime,
        en_time: encodedEndTime
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
    // Make the POST request
    return this.http.post<any>(this.apiUrl, requestBody, { headers }).pipe(
      tap(response => console.log('Server Response:', response)), // Log the response
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
