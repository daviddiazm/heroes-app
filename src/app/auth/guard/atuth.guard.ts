import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthentication(): Observable<boolean> {
    return this.authService.checkAuthenticatoin()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) this.router.navigate(['/auth'])
        }),
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log('can match');
    console.log({ route, segments });
    return this.checkAuthentication()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('can activate');
    console.log({ route, state });
    return this.checkAuthentication()
  }

}
