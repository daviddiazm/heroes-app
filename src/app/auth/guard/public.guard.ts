import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthenticated():Observable<boolean> {
    return this.authService.checkAuthenticatoin()
      .pipe(
        tap(isAuthenticated => {
          if(isAuthenticated) this.router.navigate(['/heroes'])
        }),
        map(isAuthenticated => !isAuthenticated )
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthenticated()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthenticated()
  }

}
