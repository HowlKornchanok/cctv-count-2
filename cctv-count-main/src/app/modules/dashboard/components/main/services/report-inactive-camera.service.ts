import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportInactiveCameraService {

  private apiUrl = 'line_api';

  constructor(private http: HttpClient) {}

  reportIssue(locationData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const payload = JSON.stringify(locationData);

    return this.http.post(this.apiUrl, payload, { headers });
  }
}