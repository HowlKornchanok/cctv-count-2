import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserData,NewUserData } from '../interfaces/user-data.interface';
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
      }),
      catchError(error => {
        return throwError(error.error.msg || 'Failed to get user list');
      })
    )
  }

  addNewUser(
    newUser:NewUserData
  ): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const userName = sessionStorage.getItem('uname');
    const encodedUserId = userID ? btoa(userID) : '';
    const encodedUsername = userName ? btoa(userName) : '';
    const encodedPassword = sessionStorage.getItem('bota');
    const encodeTargetUname = newUser.uname ? btoa(newUser.uname): '';
    const encodeTargetUkey = newUser.ukey ? btoa(newUser.ukey): '';
    const encodeTargetRole = newUser.role ? btoa(newUser.role): '';
    const encodedFirstName = newUser.firstName ? btoa(newUser.firstName) : '';
    const encodedLastName = newUser.lastName ? btoa(newUser.lastName) : '';
    const encodedAddress = newUser.address ? btoa(newUser.address) : '';
    const encodedEmail = newUser.email ? btoa(newUser.email) : '';
    const encodedEnable = 'true';
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

  deleteUser(targetUserId: number, targetUname: string): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const loggedInUserId = sessionStorage.getItem('userID');
    const loggedInUserName = sessionStorage.getItem('uname');
    const encodedLoggedInUserId = loggedInUserId ? btoa(loggedInUserId) : '';
    const encodedLoggedInUsername = loggedInUserName ? btoa(loggedInUserName) : '';
    const encodedTargetUserId = targetUserId ? btoa(targetUserId.toString()) : '';
    const encodeTargetUname = targetUname ? btoa(targetUname): '';
  
    if (encodedLoggedInUserId === encodedTargetUserId) {
      return throwError("You cannot delete yourself.");
    }
  
    const payload = {
      id: encodedLoggedInUserId,
      auth_data: {
        uname: encodedLoggedInUsername,
      },
      detail: {
        user_id: encodedTargetUserId,
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
  

    return this.http.request('delete', `${this.apiUrl}/delete_user_data`, { body: requestBody, headers }).pipe(
      tap(response => {
        console.log('Delete Camera Service Response:', response);
      })
    );
  }
  

  updateUser(updatedUser: UserData): Observable<any> {
    const userToken = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');
    const encodedUserId = userID ? btoa(userID) : '';
    const userName = sessionStorage.getItem('uname');
    const encodedUsername = userName ? btoa(userName) : '';
  
    const payload = {
      id: encodedUserId,
      auth_data: {
        uname: encodedUsername,
        ukey: sessionStorage.getItem('bota')
      },
      detail: {
        user_id: updatedUser.id,
        role: updatedUser.role,
        is_enable: updatedUser.is_enable
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
  
    return this.http.put<any>(`${this.apiUrl}/update_user_data`, requestBody, { headers }).pipe(
      catchError(error => {
        return throwError(error.error.msg || 'Failed to update user');
      })
    );
  }
  
  
}
