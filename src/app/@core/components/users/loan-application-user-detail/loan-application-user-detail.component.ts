import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { checkRolePermission, tableNumbering } from '../../../../@core/utils';
import { StatusBadgeComponent } from '../../../../@core/components/shared/status-badge/status-badge.component';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
import { AuthService } from '../../../services/auth/auth.service';
import { IncreaseLimitApplicationService } from '../../../services/credit-application/increase-limit.service';

@Component({
    selector: 'ngx-loan-application-user-detail',
    templateUrl: './loan-application-user-detail.component.html',
    styleUrls: ['./loan-application-user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanApplicationUserDetailComponent implements OnInit, OnDestroy {
    @Input() kibData;
    @Input() userData;
    listApplications0_0_3;
    listApplicationsIncreaseLimit;

    creditLineData;
    hasRoleToResetDeclinedApp: boolean;
    hasDeclinedApp0_0_3 = false;
    hasDeclinedAppIncreaseLimit = false;
    allDeclinedApp0_0_3 = false;
    allDeclinedAppIncreaseLimit = false;

    canResetApp0_0_3 = false;
    canResetAppIncreaseLimit = false;
    canCloseCreditLine = false;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(
                    this.listApplications0_0_3.pageNumber,
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
    tableColumnsIncreaseLimit = {
        ...this.tableColumns,
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(
                    this.listApplicationsIncreaseLimit.pageNumber,
                    cell.row.index
                ),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private creditApplicationsService: CreditApplicationService,
        private increaseLimitApplicationsService: IncreaseLimitApplicationService,

        private toaster: ToastrService,
        private router: Router,
        private authService: AuthService,
        private datePipe: DatePipe,
        private toastService: ToastrService,
        private cdr: ChangeDetectorRef
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.creditApplicationsService
            .getListCreditApplicationByCustomerId(page, this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.listApplications0_0_3 = res;
                this.hasDeclinedApp0_0_3 = this.hasDeclinedApp(res.items);
                this.allDeclinedApp0_0_3 = this.hasEveryDeclinedApp(res.items);
                this.canResetApp0_0_3 =
                    this.hasRoleToResetDeclinedApp &&
                    (this.hasDeclinedApp0_0_3 || this.allDeclinedApp0_0_3) &&
                    !this.creditLineData?.isClosed;
                this.cdr.markForCheck();
            });
    }
    getListIncreaseLimitApplications(page = 1) {
        this.increaseLimitApplicationsService
            .getListCreditApplicationByCustomerId(page, this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.listApplicationsIncreaseLimit = res;
                this.hasDeclinedAppIncreaseLimit = this.hasDeclinedApp(
                    res.items
                );
                this.allDeclinedAppIncreaseLimit = this.hasEveryDeclinedApp(
                    res.items
                );
                this.canResetAppIncreaseLimit =
                    this.hasRoleToResetDeclinedApp &&
                    (this.hasDeclinedAppIncreaseLimit ||
                        this.allDeclinedAppIncreaseLimit) &&
                    !this.creditLineData?.isClosed;
                this.cdr.markForCheck();
            });
    }
    getCreditLineStatus() {
        this.creditApplicationsService
            .getCustomerCreditLineStatus(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.creditLineData = data;
                this.canCloseCreditLine =
                    !this.creditLineData?.isClosed &&
                    (!this.allDeclinedApp0_0_3 ||
                        !this.allDeclinedAppIncreaseLimit) &&
                    this.listApplications0_0_3?.items.length > 0;

                this.cdr.markForCheck();
            });
    }
    closeCreditLine() {
        this.creditApplicationsService
            .closeCustomerCreditLine(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.toastService.success(
                        'Вы успешно закрыли кредитную линию!'
                    );
                    this.getCreditLineStatus();
                },
                error: () => {
                    this.toastService.error(
                        'Невозможно закрыть кредитную линию!'
                    );
                },
            });
    }
    hasDeclinedApp(arr) {
        return Boolean(arr.find((obj) => obj.status === 'Declined'));
    }
    hasEveryDeclinedApp(arr) {
        return (
            arr.length > 0 &&
            Boolean(arr.every((obj) => obj.status === 'Declined'))
        );
    }
    onRowSelect0_0_3(id) {
        this.router.navigate(['/credit-application/0-0-3/list/detail/' + id]);
    }
    onRowSelectIncreaseLimit(id) {
        this.router.navigate([
            '/credit-application/increase-limit/list/detail/' + id,
        ]);
    }
    resetDeclinedApp() {
        this.creditApplicationsService
            .resetDeclinedCreditApplication(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toaster.success(
                        'Время блокировки 0-0-3 успешно сброшено!'
                    );
                },
            });
    }
    resetIncreaseLimitDeclinedApp() {
        this.increaseLimitApplicationsService
            .resetDeclinedCreditApplication(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toaster.success(
                        'Время блокировки увеличении лимита успешно сброшено!'
                    );
                },
            });
    }
    checkPermission() {
        const userAuthData = this.authService.getUserData();
        this.hasRoleToResetDeclinedApp = checkRolePermission(
            userAuthData.role,
            ['credit_specialist_admin']
        );
        this.cdr.markForCheck();
    }
    ngOnInit(): void {
        this.getListIncreaseLimitApplications();
        this.getListApplications();
        this.checkPermission();
        this.getCreditLineStatus();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
