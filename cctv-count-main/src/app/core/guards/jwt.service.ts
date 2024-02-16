import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  encodeBase64(payload: any, role: string): string {
    const payloadWithRole = { ...payload, role }; // Adding role to a new object
    const payloadString = JSON.stringify(payloadWithRole);
    return btoa(payloadString); // Encoding to base64
  }

  decodeBase64(encodedPayload: string): any {
    try {
      const decodedString = atob(encodedPayload); // Decoding from base64
      const decodedPayload = JSON.parse(decodedString);
      const username = decodedPayload.username; // Retrieve username from decoded payload
      return { ...decodedPayload, username }; // Include username in the returned object
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null; // Return null or handle the error as appropriate
    }
  }
  
}
