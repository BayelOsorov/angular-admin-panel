import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        AuthModule.forRoot({
            config: {
                authority: environment.baseUrlOidc,
                redirectUrl: window.location.origin + '/cb',
                postLogoutRedirectUri: window.location.origin + '/logout',
                clientId: 'admin_idp_client',
                scope: 'openid profile roles offline_access IdentityServerApi', // 'openid profile ' + your scopes
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                // logLevel: LogLevel.Debug,
            },
        }),
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
