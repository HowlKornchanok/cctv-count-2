import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraDataService {
  private baseUrl = 'https://wrp-smarttraffic.com/api/data_view';

  constructor(private http: HttpClient) { }
  
  private getAccessTokenFromSessionStorage(): string | null {
    console.log(sessionStorage.getItem('accessToken'));
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
  private encodeData(data: any): any {
    return btoa(JSON.stringify(data));
}


  getCameraList(stationId?: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }

    const data = {
      id: userId,
      auth_data: { uname: username },
      detail: { sid: stationId || null }
    };
    
    const encodedData = btoa(JSON.stringify(data));
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}/get_camera_list`, { transaction: encodedData }, { headers });
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
    const encodedData = this.encodeData(data);
    return this.http.post(`${this.baseUrl}/get_used_port`, encodedData);
  }

  addCameraService(serviceName: string, cameraPort: string, cameraSerialNumber: string, cameraRtspUrl: string, stationId: string): Observable<any> {
    const userId = this.getDataFromSessionStorage('userID');
    const username = this.getDataFromSessionStorage('uname');
    if (!userId || !username) {
      throw new Error('User ID or username not found in session storage');
    }
    const data = {
      id: btoa(userId),
      auth_data: { uname: btoa(username) },
      detail: {
        name: btoa(serviceName),
        port: btoa(cameraPort),
        csn: btoa(cameraSerialNumber),
        url: btoa(cameraRtspUrl),
        sid: btoa(stationId)
      }
    };
    const encodedData = this.encodeData(data);
    return this.http.post(`${this.baseUrl}/add_camera_service`, encodedData);
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
    const encodedData = this.encodeData(data);
    return this.http.request('delete', `${this.baseUrl}/delete_camera_service`, { body: encodedData });
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
    const encodedData = this.encodeData(data);
    return this.http.put(`${this.baseUrl}/start_camera_service`, encodedData);
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
    const encodedData = this.encodeData(data);
    return this.http.put(`${this.baseUrl}/stop_camera_service`, encodedData);
  }
}
