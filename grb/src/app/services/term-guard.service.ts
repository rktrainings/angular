import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable()
export class TermGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {

    if (this.auth.hasAccepted()) {
      this.router.navigateByUrl('/main-menu');
      return false;
    } else {
      return true;
    }

  }

}