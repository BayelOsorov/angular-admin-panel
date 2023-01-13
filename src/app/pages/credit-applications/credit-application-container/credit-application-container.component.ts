import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth/auth.service';

@Component({
    templateUrl: './credit-application-container.component.html',
    styleUrls: ['./credit-application-container.component.scss'],
})
export class CreditApplicationContainerComponent implements OnInit {
    // redirectUrls = {
    //     '0-0-3': '0-0-3/get',
    //     'fuel-card': 'fuel-card/get',
    // };
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        const userData = this.authService.getUserData();
        const urlEnd = this.router.url.split('/')[2];

        const isAdmin = Array.isArray(userData.role)
            ? userData.role.find((item) => item === 'admin')
            : userData.role.includes('admin');

        if (isAdmin) {
            this.router.navigate([`credit-application/${urlEnd}/list`]);

            return;
        }
        this.router.navigate([`credit-application/${urlEnd}/get`]);
    }
}
