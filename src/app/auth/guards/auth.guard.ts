import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private _authService : AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this._authService.verificarToken().pipe(
      tap( tokenValido => {
        if (!tokenValido) {
          this._router.navigate(['/auth/login']);
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this._authService.verificarToken().pipe(
      tap( tokenValido => {
        if (!tokenValido) {
          this._router.navigate(['/auth/login']);
        }
      })
    );
  }
}
