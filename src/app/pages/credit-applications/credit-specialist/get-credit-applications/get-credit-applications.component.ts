import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
import { FuelCardApplicationService } from '../../../../@core/services/credit-application/fuel-card.service';
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
                        `credit-application/0-0-3/detail/${data.id}`,
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
                        `credit-application/fuel-card/detail/${data.id}`,
                    ]);
                },
            });
    }

    getCreditSpecialistAccount() {
        this.creditApplication
            .getCreditSpecialistAccount()
            .toPromise()
            .then((res) => console.log(res))
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
                next: (data) => {
                    console.log(data);
                },
            });
    }

    getFuelCardCreditSpecialistAccount() {
        this.fuelCardApplication
            .getFuelCardSpecialistAccount()
            .toPromise()
            .then((res) => console.log(res))
            .catch((e) => {
                if (e.status === 403) {
                    this.createFuelCardCreditSpecialistAccount();
                }
            });
    }

    createFuelCardCreditSpecialistAccount() {
        this.fuelCardApplication
            .createFuelCardSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    console.log(data);
                },
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
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
