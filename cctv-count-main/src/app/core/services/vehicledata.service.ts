import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  private apiUrl = 'https://wrp-smarttraffic.com/api/data_view/get_vehicle_data'; 

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


    const payloadJsonString = JSON.stringify(payload);

    // Construct the message object with the required format
    const message = {
      transaction: btoa(payloadJsonString)
    };
    console.log(message);
    // Set the Authorization header with the bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    // Make HTTP POST request to get user data with headers
    return this.http.post<any>(`${this.apiUrl}`, message, { headers }).pipe(
      catchError(error => {
        // Handle error
        return throwError(error.error.msg || 'Failed to get vehicle data');
      })
    );
  }
}
