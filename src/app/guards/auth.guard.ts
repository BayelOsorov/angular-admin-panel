import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanDeactivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
    isAuthenticated: boolean;
    constructor(
        public oidcSecurityService: OidcSecurityService,
        private router: Router
    ) {
        this.oidcSecurityService
            .checkAuth()
            .subscribe(({ isAuthenticated }) => {
                this.isAuthenticated = isAuthenticated;
            });
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        console.log(this.isAuthenticated);

        if (this.isAuthenticated) {
            // this.oidcSecurityService.authorize();
            return true;
        }
        this.router.navigate(['auth/register']);
        return true;
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return true;
    }
}
