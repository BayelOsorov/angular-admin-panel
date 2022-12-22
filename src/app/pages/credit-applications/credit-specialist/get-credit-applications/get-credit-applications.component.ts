import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
@Component({
    templateUrl: './get-credit-applications.component.html',
    styleUrls: ['./get-credit-applications.component.scss'],
})
export class GetCreditApplicationsComponent implements OnInit, OnDestroy {
    applications;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        public router: Router,
        private toaster: ToastrService,
        private creditApplication: CreditApplicationService
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
    fuelApplication() {}

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
    getApplication() {
        const urlEnd = this.router.url.split('/')[2];
        // this.applications[urlEnd]();
        this.loanApplication();
    }
    ngOnInit(): void {
        this.applications = {
            '0-0-3': this.loanApplication,
            fuel: this.fuelApplication,
        };
        this.getCreditSpecialistAccount();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
