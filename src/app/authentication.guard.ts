import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGaurdService } from './services/auth-guard-service/auth-gaurd.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authGuardService:AuthGaurdService, private router: Router){}
  canActivate(): boolean{
    if (!this.authGuardService.gettoken()) {  
      this.router.navigateByUrl("/login");  
  }
  return this.authGuardService.gettoken();
  }
  
}
