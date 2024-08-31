import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginService, private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const user = this.getCurrentUser();

    if (!user) {
      this.route.navigate(['login']);
      return false;
    }

    const logoutPath = route.url.some(segment => segment.path.toLowerCase() === 'logout');
    if (logoutPath) {
      this.login.logOut().subscribe(() => {
        this.route.navigate(['login']);
      });
      return false;
    }

    return true;
  }

  private getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }
    return null;
  }
}
