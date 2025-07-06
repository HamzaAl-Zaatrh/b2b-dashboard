import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAuthToken(): string | null {
    // Simulate getting an auth token from local storage or a service
    return localStorage.getItem('authToken');
  }

  logout() {
    console.log('User logged out');
  }
}
