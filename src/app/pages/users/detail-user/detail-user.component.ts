import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../../../@core/services/credit-application/credit.service';
import { UsersService } from '../../../@core/services/users/users.service';

@Component({
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit, OnDestroy {
    userData;
    applicationId;
    videos;
    loanApplKibData = [];
    fuelCardApplKibData = [];

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private creditService: ApplicationRequestsService,
        private usersService: UsersService,
        private route: ActivatedRoute
    ) {}
    getUserDetail() {
        this.usersService
            .getDetailUser(this.applicationId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: any) => {
                    this.userData = data;

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
