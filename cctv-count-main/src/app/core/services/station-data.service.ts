import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StationData, UpdateStationData } from '../interfaces/station-data.interface';

@Injectable({
  providedIn: 'root'
})
export class StationDataService {
  private apiUrl = 'https://wrp-smarttraffic.com/api/data_view';

  constructor(private http: HttpClient) {}

  getStationData(): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';

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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/get_station_data`,requestBody, { headers }).pipe(
      tap(response => {
      }),
      catchError(error => {
        // Handle error
        return throwError(error.error.msg || 'Failed to get station data');
      })
    );
  }

  addNewStation(stationData: StationData): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const encodedUserId = userID ? btoa(userID) : '';
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';
  
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername
      },
      detail: {
        st_name: btoa(stationData.st_name),
        lat: btoa(stationData.lat),
        lon: btoa(stationData.lon)
      }
    };
  
    const jsonString = JSON.stringify(payload);
    const encodedPayload = btoa(jsonString);
    const requestBody = {
      transaction: encodedPayload
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });
  
    return this.http.post<any>(`${this.apiUrl}/add_new_station`, requestBody, { headers }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to add new station');
      })
    );
  }

  


  updateStationData(updatedStationData: StationData): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const encodedUserId = userID ? btoa(userID) : '';
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';
  
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername
      },
      detail: {
        st_id: btoa(updatedStationData.st_id),
        st_name: btoa(updatedStationData.st_name),
        lat: btoa(updatedStationData.lat),
        lon: btoa(updatedStationData.lon)
      }
    };
  
    const jsonString = JSON.stringify(payload);
    const encodedPayload = btoa(jsonString);
    const requestBody = {
      transaction: encodedPayload
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });
  
    return this.http.put<any>(`${this.apiUrl}/update_station_data`, requestBody, { headers }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to update station data');
      })
    );
  }

  deleteStationData(stationId: string): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const encodedUserId = userID ? btoa(userID) : '';
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';
    const encodedStationId = stationId ? btoa(stationId) : '';
  
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername
      },
      detail: {
        st_id: encodedStationId
      }
    };
  
    const jsonString = JSON.stringify(payload);
    const encodedPayload = btoa(jsonString);
    const requestBody = {
      transaction: encodedPayload
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });
  
    return this.http.delete<any>(`${this.apiUrl}/delete_station_data`, { headers, body: requestBody }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to delete station data');
      })
    );
  }
  
  
  
}


