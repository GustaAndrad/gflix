import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { from, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly LOCAL_STORAGE_KEY = 'authToken';

  constructor(private auth: Auth, private authService: AuthService) { }

  logIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(async userCredential => {
        const token = await userCredential.user?.getIdToken();
        const uid = userCredential.user.uid;
        if (token) {
          this.authService.setUser(token, uid);
        }
      })
    );
  }

  logOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.authService.clearUser())
    );
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  getStoredToken(): string | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }
}
