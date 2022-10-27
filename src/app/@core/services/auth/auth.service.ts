import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private oidcSecurityService: OidcSecurityService,
        private router: Router
    ) {}
    getUserData() {
        const { userData } = JSON.parse(
            sessionStorage.getItem('0-admin_idp_client')
        );
        return userData;
    }
    logout() {
        this.oidcSecurityService.logoff();
        sessionStorage.clear();
        localStorage.clear();
    }
    getAccessToken() {
        return this.oidcSecurityService.getAccessToken();
    }
    checkAuth() {
        let isAuth = false;
        this.oidcSecurityService
            .checkAuth()
            .subscribe(
                ({ isAuthenticated, userData, accessToken, idToken }) =>
                    (isAuth = isAuthenticated)
            );
        return isAuth;
    }
    login() {
        this.oidcSecurityService.authorize();
    }
}
