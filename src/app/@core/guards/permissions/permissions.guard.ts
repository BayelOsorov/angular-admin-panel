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
        // const userData = this.authService.getUserData();
        //     if (userData.profile.role instanceof Array) {
        // const isAdmin = userData.profile.role.find((item) => item === 'admin')
        //     return _nav.map((item) =>
        //       item.items.filter((item) =>
        //         item.role.includes(isAdmin ? isAdmin : userData.profile.role[0]),
        //       ),
        //     )
        //   }
        //   return _nav
        //     .map((item) =>
        //       item.items.filter((item) => item.role.includes(userData && userData.profile.role)),
        //     )
        //     .filter((item) => item.length > 0)
        // }
        // route.data.roles.filter((role) => accessLevel(role, userData.role));

        return true;
    }
}
