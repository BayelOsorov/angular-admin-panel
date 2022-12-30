import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { accessLevel } from '../../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
    constructor(private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const userData = this.authService.getUserData();
        if (userData) {
            return accessLevel(route.data.roles, userData.role);
        }
        return false;
    }
}
