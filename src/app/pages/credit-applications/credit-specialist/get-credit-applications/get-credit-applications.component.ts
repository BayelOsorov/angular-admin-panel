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
export class GetCreditApplicationsComponent implements OnInit {
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
    // eslint-disable-next-line @typescript-eslint/member-ordering
    applications = {
        '0-0-3': this.loanApplication,
        fuel: this.fuelApplication,
    };
    getCreditSpecialistAcctount() {
        this.creditApplication
            .getCreditSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
                error(err) {
                    if (err.status === 403) {
                        this.createCreditSpecialistAcctount();
                    }
                },
            });
    }
    createCreditSpecialistAcctount() {
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
        this.getCreditSpecialistAcctount();
    }
}
