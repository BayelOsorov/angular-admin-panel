import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
import { FuelCardApplicationService } from '../../../../@core/services/credit-application/fuel-card.service';
import { IncreaseLimitApplicationService } from '../../../../@core/services/credit-application/increase-limit.service';
@Component({
    templateUrl: './get-credit-applications.component.html',
    styleUrls: ['./get-credit-applications.component.scss'],
})
export class GetCreditApplicationsComponent implements OnInit, OnDestroy {
    applications;
    endUrl;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        public router: Router,
        public toaster: ToastrService,
        public creditApplication: CreditApplicationService,
        public increaseLimitApplicationService: IncreaseLimitApplicationService,

        public fuelCardApplication: FuelCardApplicationService
    ) {}
    loanApplication() {
        this.creditApplication
            .getCreditApplication()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок!'
                        );
                    }
                    this.router.navigate([
                        `credit-application/0-0-3/get/detail/${data.id}`,
                    ]);
                },
            });
    }
    increaseLimitApplication() {
        this.increaseLimitApplicationService
            .getCreditApplication()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок!'
                        );
                    }
                    this.router.navigate([
                        `credit-application/increase-limit/get/detail/${data.id}`,
                    ]);
                },
            });
    }
    fuelApplication() {
        this.fuelCardApplication
            .getFuelCardApplication()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок!'
                        );
                    }
                    this.router.navigate([
                        `credit-application/fuel-card/get/detail/${data.id}`,
                    ]);
                },
            });
    }

    getCreditSpecialistAccount() {
        this.creditApplication
            .getCreditSpecialistAccount()
            .toPromise()
            .then()
            .catch((e) => {
                if (e.status === 403) {
                    this.createCreditSpecialistAccount();
                }
            });
    }

    createCreditSpecialistAccount() {
        this.creditApplication
            .createCreditSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }

    getFuelCardCreditSpecialistAccount() {
        this.fuelCardApplication
            .getFuelCardSpecialistAccount()
            .toPromise()
            .then()
            .catch((e) => {
                if (e.status === 0) {
                    this.createFuelCardCreditSpecialistAccount();
                }
            });
    }

    createFuelCardCreditSpecialistAccount() {
        this.fuelCardApplication
            .createFuelCardSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }
    getApplication() {
        // const urlEnd = this.router.url.split('/')[2];
        // this.applications[urlEnd]();

        if (this.endUrl === '0-0-3') {
            this.loanApplication();
        }
        if (this.endUrl === 'fuel-card') {
            this.fuelApplication();
        }
        if (this.endUrl === 'increase-limit') {
            this.increaseLimitApplication();
        }
    }
    ngOnInit(): void {
        this.applications = {
            '0-0-3': this.loanApplication,
            'fuel-card': this.fuelApplication,
        };
        this.endUrl = this.router.url.split('/')[2];
        if (this.endUrl === '0-0-3') {
            this.getCreditSpecialistAccount();
        }
        if (this.endUrl === 'fuel-card') {
            this.getFuelCardCreditSpecialistAccount();
        }
        if (this.endUrl === 'increase-limit') {
            this.getCreditSpecialistAccount();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
