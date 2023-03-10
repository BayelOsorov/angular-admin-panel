import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBadgeComponent } from '../../../../@core/components/shared/status-badge/status-badge.component';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
import { FuelCardApplicationService } from '../../../../@core/services/credit-application/fuel-card.service';
import { IncreaseLimitApplicationService } from '../../../../@core/services/credit-application/increase-limit.service';
import { LoaderService } from '../../../../@core/services/http/loader.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './get-credit-applications.component.html',
    styleUrls: ['./get-credit-applications.component.scss'],
})
export class GetCreditApplicationsComponent implements OnInit, OnDestroy {
    endUrl;
    filter = {
        from: '',
        to: '',
        status: 'Postponed',
        page: 1,
    };
    listApplications;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(
                    this.listApplications.pageNumber,
                    cell.row.index
                ),
        },

        createdAt: {
            title: 'Дата',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
        processors: {
            title: 'Оператор',
            type: 'text',
            valuePrepareFunction: (item) => item[item.length - 1]?.fullname,
        },
        status: {
            title: 'Статус',
            type: 'custom',
            renderComponent: StatusBadgeComponent,
        },
        custom: {
            title: 'Детали',
            type: 'html',
            valuePrepareFunction: () => ` <a
                          class='color-a'
                        >
                          Подробнее
                        </a>`,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        public router: Router,
        public toaster: ToastrService,
        public creditApplicationService: CreditApplicationService,
        public increaseLimitApplicationService: IncreaseLimitApplicationService,

        public fuelCardApplicationService: FuelCardApplicationService,
        private datePipe: DatePipe
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListCreditApplications(page = 1) {
        this.creditApplicationService
            .getListCreditApplication(page, this.filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }
    getListFuelApplications(page = 1) {
        this.fuelCardApplicationService
            .getListFuelCardApplication(page, this.filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }
    getListIncreaseLimitApplications(page = 1) {
        this.increaseLimitApplicationService
            .getListCreditApplication(page, this.filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }

    onRowSelect(id) {
        this.handleEndUrl({
            '0-0-3': [() => this.getPostponeCreditAppDetail(id)],
            'fuel-card': [() => this.getPostponeFuelCardAppDetail(id)],
            'increase-limit': [
                () => this.getPostponeIncreaseLimitAppDetail(id),
            ],
        });
    }
    getPostponeCreditAppDetail(id) {
        this.creditApplicationService
            .getPostponeCreditApplicationDetail(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.router.navigate([
                        `credit-application/0-0-3/get/detail/${id}`,
                    ]);
                },
            });
    }
    getPostponeFuelCardAppDetail(id) {
        this.fuelCardApplicationService
            .getPostponeFuelCardApplicationDetail(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.router.navigate([
                        `credit-application/fuel-card/get/detail/${id}`,
                    ]);
                },
            });
    }
    getPostponeIncreaseLimitAppDetail(id) {
        this.increaseLimitApplicationService
            .getPostponeCreditApplicationDetail(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.router.navigate([
                        `credit-application/increase-limit/get/detail/${id}`,
                    ]);
                },
            });
    }
    loanApplication() {
        this.creditApplicationService
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
        this.fuelCardApplicationService
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
        this.creditApplicationService
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
        this.creditApplicationService
            .createCreditSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }

    getFuelCardCreditSpecialistAccount() {
        this.fuelCardApplicationService
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
        this.fuelCardApplicationService
            .createFuelCardSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }
    getApplication() {
        this.handleEndUrl({
            '0-0-3': [this.loanApplication],
            'fuel-card': [this.fuelApplication],
            'increase-limit': [this.increaseLimitApplication],
        });
    }
    handleEndUrl(handlers) {
        if (handlers.hasOwnProperty(this.endUrl)) {
            const handler = handlers[this.endUrl];
            if (typeof handler === 'function') {
                handler.call(this);
            } else if (Array.isArray(handler)) {
                handler.forEach(
                    (fn) => typeof fn === 'function' && fn.call(this)
                );
            }
        }
    }
    ngOnInit(): void {
        this.endUrl = this.router.url.split('/')[2];
        this.handleEndUrl({
            '0-0-3': [
                this.getCreditSpecialistAccount,
                this.getListCreditApplications,
            ],
            'fuel-card': [
                this.getFuelCardCreditSpecialistAccount,
                this.getListFuelApplications,
            ],
            'increase-limit': [
                this.getCreditSpecialistAccount,
                this.getListIncreaseLimitApplications,
            ],
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
