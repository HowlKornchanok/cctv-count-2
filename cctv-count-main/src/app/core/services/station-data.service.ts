import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private apiUrl = 'http://localhost:9003';

  constructor(private http: HttpClient) {}

  getStationData(): Observable<any> {
    // Retrieve access token and transaction key from session storage
    const accessToken = sessionStorage.getItem('accessToken');
    const transactionBody = sessionStorage.getItem('UserTransaction');
    if (!accessToken || !transactionBody) {
      return throwError('Access token or transaction key not found in session storage');
    }

    // Set headers with access token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });


    

    // Make POST request to the API endpoint
    return this.http.post<any>(`${this.apiUrl}/api/data_view/get_station_data`,JSON.parse(transactionBody), { headers }).pipe(
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
