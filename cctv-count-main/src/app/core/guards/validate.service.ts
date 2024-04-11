import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError , timer } from 'rxjs';
import { catchError, tap , map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private readonly TOKEN_TIMEOUT_WARNING_THRESHOLD = 60000

  constructor(private http: HttpClient) { }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Token is invalid or does not contain expiry information
    }
    
    const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = new Date().getTime();
    const timeRemaining = expiryTime - currentTime;
    
    if (timeRemaining <= 0) {
      // console.log('Token has already expired');
      return true; // Token has already expired
    }
  
    const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60)); // Convert milliseconds to minutes
    
    // console.log(`Time remaining until token expiry: ${minutesRemaining} minutes`);
    
    return false; // Token is not expired yet
  }
  
  
  decodeToken(token: string): any {
    try {
      // console.log('Token:', token);
      
      const tokenParts = token.split('.');
      // console.log('Token parts:', tokenParts);
  
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
      }
  
      const payloadBase64 = tokenParts[1];
      // console.log('Payload Base64:', payloadBase64);
  
      // Replace characters that are not valid base64 characters
      const replacedBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      // console.log('Replaced Base64:', replacedBase64);
  
      const decodedPayload = JSON.parse(atob(replacedBase64)); // Decode from base64 and parse JSON
      // console.log('Decoded Payload:', decodedPayload);
  
      return decodedPayload;
    } catch (error) {
      // console.error('Error decoding token:', error);
      return null;
    }
  }


  showTokenTimeoutMessage() {
    // Display a message to the user indicating that the token has timed out
    alert('Your session has timed out. Please log in again.');
  }

  getTimeRemainingBeforeTimeout(token: string): Observable<number> {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return throwError('Invalid token or no expiry information');
    }

    const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
    const currentTime = new Date().getTime();
    const timeRemaining = expiryTime - currentTime;

    if (timeRemaining <= 0) {
      return throwError('Token has already expired');
    }

    return timer(0, 1000).pipe(
      map(() => {
        const remaining = expiryTime - new Date().getTime();
        return remaining > 0 ? remaining : 0;
      }),
      catchError(error => throwError('Error calculating time remaining: ' + error))
    );
  }

  // Method to display remaining time in a user-friendly format
  showRemainingTime(token: string): void {
    this.getTimeRemainingBeforeTimeout(token).subscribe(
      remaining => {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const remainingTime = `${minutes} minutes ${seconds} seconds`;
  
        if (remaining <= this.TOKEN_TIMEOUT_WARNING_THRESHOLD) {
          // Show a warning if the remaining time is below the threshold
          console.warn(`Token will expire soon. Remaining time: ${remainingTime}`);
          
          if (minutes < 30) {
            // Display a warning message with options to extend the session
            const extendSession = confirm(`Your session will expire in less than 10 minutes (${remainingTime}). Would you like to extend your session?`);
            if (extendSession) {
              // If the user chooses to extend the session, you can perform the necessary actions here
              console.log('Session extended');
              // For example, you can refresh the token or keep the session alive
            } else {
              console.log('Session not extended');
              // If the user chooses not to extend the session, you can handle it accordingly
            }
          }
        } else {
          // console.log(`Remaining time until token expiry: ${remainingTime}`);
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  
  

}
