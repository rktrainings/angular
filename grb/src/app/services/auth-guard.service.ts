import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth-service.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['session-expired']);
      return false;
    }

  }

}