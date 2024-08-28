import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private login: LoginService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    // Verifica se o usuário está autenticado
    const user = this.getCurrentUser();

    // Se o usuário não estiver autenticado, redireciona para a página de login
    if (!user) {
      this.route.navigate(['login']);
      return false;
    }

    // Verifica o caminho da rota para fazer logout se necessário
    const logoutPath = route.url.some(segment => segment.path.toLowerCase() === 'logout');
    if (logoutPath) {
      this.login.logOut().subscribe(() => {
        this.route.navigate(['login']);
      });
      return false; // Bloqueia o acesso após o logout
    }

    // Permite o acesso à rota se o usuário estiver autenticado
    return true;
  }

  private getCurrentUser() {
    // Obtém o token do localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Se houver token, revalida o usuário
      return true;// Ajuste conforme necessário para verificar o usuário
    }
    return null;
  }
}
