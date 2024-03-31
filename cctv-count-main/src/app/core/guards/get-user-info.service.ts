import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoService {

  private apiUrl = 'http://localhost:9001/api/auth/get_user_data';

  constructor(private http: HttpClient) { }

  getUserInfo(token: string): Observable<any> {
    // Assuming 'token' is the authentication token sent in the request header
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.post<any>(this.apiUrl, {}, { headers });
  }
}