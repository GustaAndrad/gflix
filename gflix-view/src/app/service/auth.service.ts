import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<string | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.userSubject.next(localStorage.getItem('authToken'));
  }

  setUser(token: string | null) {
    localStorage.setItem('authToken', token || '');
    this.userSubject.next(token);
  }

  clearUser() {
    localStorage.removeItem('authToken');
    this.userSubject.next(null);
  }
}
