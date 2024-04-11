import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://wrp-smarttraffic.com/api/data_view';

  constructor(private http: HttpClient) {}

  getUserList(): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';

    const payload = {
      id: '',
      auth_data: {
        uname: encodedUsername
      },
      detail: {}
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

    return this.http.post<any>(`${this.apiUrl}/get_user_list`, requestBody, { headers }).pipe(
      tap(response => {

      }),
      catchError(error => {
        console.error('Error fetching user list:', error);
        return throwError(error.error.msg || 'Failed to get user list');
      })
    );
  }

  getUserInfo(userId: string): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('uname');
    const encodedUsername = username ? btoa(username) : '';
    const encodedUserId = userId ? btoa(userId) : '';

    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername
      },
      detail: {
        user_id: encodedUserId
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

    return this.http.post<any>(`${this.apiUrl}/get_user_list`, requestBody, { headers }).pipe(
      tap(response => {
        console.log('User list response:', response);
      }),
      catchError(error => {
        console.error('Error fetching user list:', error);
        return throwError(error.error.msg || 'Failed to get user list');
      })
    )
  }

  addNewUser(
    targetUname: string,
    targetUkey: string,
    targetRole: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string
  ): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const userName = sessionStorage.getItem('uname');
    const encodedUserId = userID ? btoa(userID) : '';
    const encodedUsername = userName ? btoa(userName) : '';
    const encodedPassword = sessionStorage.getItem('bota');
    const encodeTargetUname = targetUname ? btoa(targetUname): '';
    const encodeTargetUkey = targetUkey ? btoa(targetUkey): '';
    const encodeTargetRole = targetRole ? btoa(targetRole): '';
    const encodedFirstName = firstName ? btoa(firstName) : '';
    const encodedLastName = lastName ? btoa(lastName) : '';
    const encodedAddress = address ? btoa(address) : '';
    const encodedEmail = email ? btoa(email) : '';
    const encodedEnable = btoa('True');
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername,
        ukey: encodedPassword
      },
      detail: {
        uname: encodeTargetUname,
        ukey: encodeTargetUkey,
        role: encodeTargetRole,
        fname: encodedFirstName,
        lname: encodedLastName,
        address: encodedAddress,
        email: encodedEmail,
        is_enable: encodedEnable,
      },
      created_by: encodedUserId
    };

    const jsonString = JSON.stringify(payload);
    const encodedPayload = btoa(jsonString);
    const requestBody = {
      transaction: encodedPayload
    };
    console.log(requestBody);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post<any>(`${this.apiUrl}/add_new_user`, requestBody, { headers }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to add new user');
      })
    );
  }

  deleteUser(targetUserId: number): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const encodedUserId = userID ? btoa(userID) : '';
    const encodedTargetUserId = targetUserId ? btoa(targetUserId.toString()) : '';
    const userName = sessionStorage.getItem('uname');
    const encodedUsername = userName ? btoa(userName) : '';
    const encodedPassword = sessionStorage.getItem('bota');
    
  
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername,
        ukey: encodedPassword
      },
      detail: {
        user_id: encodedTargetUserId
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
  
    return this.http.delete<any>(`${this.apiUrl}/delete_user_data`, { headers, body: requestBody }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to delete user');
      })
    );
    
  }
}
