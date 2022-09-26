import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private oidcSecurityService: OidcSecurityService) {}
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
}
