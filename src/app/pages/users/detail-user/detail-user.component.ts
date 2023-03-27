import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../@core/services/auth/auth.service';
import { ApplicationRequestsService } from '../../../@core/services/credit-application/credit.service';
import { UsersService } from '../../../@core/services/users/users.service';
import { checkRolePermission } from '../../../@core/utils';

@Component({
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit, OnDestroy {
    userData;
    applicationId;
    videos;
    isIdentificated = false;
    hasRoleToResetDeclinedApp = false;
    loanApplKibData = [];
    fuelCardApplKibData = [];

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private creditService: ApplicationRequestsService,
        private usersService: UsersService,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}
    checkPermission() {
        const userAuthData = this.authService.getUserData();
        this.hasRoleToResetDeclinedApp = checkRolePermission(
            userAuthData.role,
            ['credit_specialist_admin']
        );
    }
    getUserDetail() {
        this.usersService
            .getDetailUser(this.applicationId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: any) => {
                    this.userData = data;
                    this.isIdentificated = Boolean(
                        data.identificationInformation
                    );

                    this.getVideos(data.id);
                    this.getLocalCreditBureauInfo(data.id);
                },
            });
    }

    getVideos(id) {
        this.creditService
            .getCustomerVideoCalls(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.videos = res;
            });
    }

    getLocalCreditBureauInfo(id) {
        this.creditService
            .getCustomerCreditLines(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: [any]) => {
                    data.find((obj) => {
                        if (obj.productCode === 'Charmander') {
                            this.loanApplKibData.push(obj);
                        }
                        if (obj.productCode === 'Pikachu') {
                            this.fuelCardApplKibData.push(obj);
                        }
                    });
                },
            });
    }

    ngOnInit(): void {
        this.checkPermission();
        this.route.params.subscribe((params) => {
            this.applicationId = params['id'];
            this.getUserDetail();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
