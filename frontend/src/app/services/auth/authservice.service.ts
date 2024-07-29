import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getDecodedToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>('http://localhost:3000/api/auth/login', { email, password })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/register', {
      name,
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.currentUserSubject.next(this.getDecodedToken());
  }
}
