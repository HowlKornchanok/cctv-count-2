import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap , catchError , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraDataService {
  private baseUrl = 'https://wrp-smarttraffic.com/api/camera_service';

  constructor(private http: HttpClient) { }
  
  private getAccessTokenFromSessionStorage(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  private getHeaders(): HttpHeaders {
    const accessToken = this.getAccessTokenFromSessionStorage();
    if (!accessToken) {
      throw new Error('Access token not found in session storage');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  }

  private getDataFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  private encodeData(data: any): string {
    return btoa(JSON.stringify(data));
  }

  private createTransactionObject(data: any): any {
    const encodedData = this.encodeData(data);
    return { transaction: encodedData };
  }

  getCameraList(stationId?: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }

    const requestData = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: { sid: stationId ? btoa(stationId) : null }
    };

    const transactionObject = this.createTransactionObject(requestData);
    const headers = this.getHeaders();
    
    return this.http.post<any>(`${this.baseUrl}/get_camera_list`, transactionObject, { headers })
  }

  getUsedPort(): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: {}
    };
    const transactionObject = this.createTransactionObject(data);
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/get_used_port`, transactionObject, { headers }).pipe(
      tap(response => {
        console.log('Used Port Response:', response);
      })
    );
  }

  addCameraService(serviceName: string, cameraPort: string, cameraSerialNumber: string, cameraRtspUrl: string, stationId: string, service_url: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    const role = this.getDataFromSessionStorage('role');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username),role: btoa('1') },
      detail: {
        name: btoa(serviceName),
        port: btoa(cameraPort),
        csn: btoa(cameraSerialNumber),
        url: btoa(cameraRtspUrl),
        surl: btoa(service_url),
        sid: btoa(stationId)
      }
    };

    console.log(data);
    const transactionObject = this.createTransactionObject(data);
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/add_camera_service`, transactionObject, { headers }).pipe(
      tap((response: any) => {
        console.log('Add Camera Service successful', response);
        
      })
    );
  }

  deleteCameraService(serviceName: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: { name: btoa(serviceName) }
    };
    const transactionObject = this.createTransactionObject(data);
    const headers = this.getHeaders();
    return this.http.request('delete', `${this.baseUrl}/delete_camera_service`, { body: transactionObject, headers }).pipe(
      tap(response => {
        console.log('Delete Camera Service Response:', response);
      })
    );
  }

  startCameraService(serviceName: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: { name: btoa(serviceName) }
    };
    const transactionObject = this.createTransactionObject(data);
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/start_camera_service`, transactionObject, { headers }).pipe(
      tap(response => {
        console.log('Start Camera Service Response:', response);
      })
    );
  }

  stopCameraService(serviceName: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: { name: btoa(serviceName) }
    };
    const transactionObject = this.createTransactionObject(data);
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/stop_camera_service`, transactionObject, { headers }).pipe(
      tap(response => {
        console.log('Stop Camera Service Response:', response);
      })
    );
  }
}
