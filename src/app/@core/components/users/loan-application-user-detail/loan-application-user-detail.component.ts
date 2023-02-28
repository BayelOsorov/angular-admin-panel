import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
    Input,
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

@Component({
    selector: 'ngx-loan-application-user-detail',
    templateUrl: './loan-application-user-detail.component.html',
    styleUrls: ['./loan-application-user-detail.component.scss'],
    // changeDetection: ChangeDetectionStrategy.Default,
})
export class LoanApplicationUserDetailComponent implements OnInit, OnDestroy {
    @Input() kibData;
    @Input() userData;
    listApplications;
    canresetDeclinedApp: boolean;
    hasDeclinedApp: boolean;
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
        private creditApplicationsService: CreditApplicationService,
        private toaster: ToastrService,
        private router: Router,
        private authService: AuthService,
        private datePipe: DatePipe
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, hh:mm');
    }
    getListApplications(page = 1) {
        this.creditApplicationsService
            .getListCreditApplicationByCustomerId(page, this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.listApplications = res;
                if (res.items.find((obj) => obj.status === 'Declined')) {
                    this.hasDeclinedApp = true;
                }
            });
    }
    onRowSelect(id) {
        this.router.navigate(['/credit-application/0-0-3/list/detail/' + id]);
    }
    resetDeclinedApp() {
        this.creditApplicationsService
            .resetDeclinedCreditApplication(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toaster.success('Время блокировки успешно сброшено!');
                },
            });
    }
    checkPermission() {
        const userAuthData = this.authService.getUserData();
        this.canresetDeclinedApp = checkRolePermission(userAuthData.role, [
            'credit_specialist_admin',
        ]);
    }
    ngOnInit(): void {
        this.getListApplications();
        this.checkPermission();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
