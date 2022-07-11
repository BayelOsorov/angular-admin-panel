import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private route: Router) {}
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLogedIn() {
    return this.getToken() !== null;
  }
  login(userInfo: {
    email: string;
    password: string;
  }): Observable<string | boolean> {
    if (
      userInfo.email === 'admin@gmail.com' &&
      userInfo.password === 'Admin123'
    ) {
      this.setToken('ijiejfIJEFIJFeijfjeifjJFEijfjegewgjweeoijg');
      return of(true);
    }
    return throwError(() => new Error('Error'));
  }
  logOut() {
    this.route.navigate(['login']);
  }
}
