import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth/auth.service';

@Component({
    templateUrl: './credit-application-container.component.html',
    styleUrls: ['./credit-application-container.component.scss'],
})
export class CreditApplicationContainerComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        const userData = this.authService.getUserData();

        const isAdmin = Array.isArray(userData.role)
            ? userData.role.find((item) => item === 'admin')
            : userData.role.includes('admin');

        console.log(isAdmin);
    }
}
