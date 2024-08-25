import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private AuthGuard: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.AuthGuard.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
