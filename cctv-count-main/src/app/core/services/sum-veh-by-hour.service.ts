import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../guards/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SumVehByHourService {

  private apiUrl = 'assets/output_new.json';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) { }

  getData(): Observable<any[]> {
    // Refresh token expiration whenever the service is used
    this.authService.refreshTokenExpiration();
    return this.http.get<any[]>(this.apiUrl);
  }
}
