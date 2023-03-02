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
import { checkRolePermission, tableNumbering } from '../../../utils';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'ngx-fuel-card-user-detail',
    templateUrl: './fuel-card-user-detail.component.html',
    styleUrls: ['./fuel-card-user-detail.component.scss'],
    // changeDetection: ChangeDetectionStrategy.Default,
})
export class FuelCardUserDetailComponent implements OnInit, OnDestroy {
    @Input() kibData;
    @Input() userData;
    listApplications;
    canresetDeclinedApp: boolean;
    hasDeclinedApp;
    fuelCardCreditLineData;
    allDeclinedApp = false;
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
        private fuelCardApplicationsService: FuelCardApplicationService,
        private toaster: ToastrService,
        private router: Router,
        private authService: AuthService,
        private datePipe: DatePipe,
        private toastService: ToastrService
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.fuelCardApplicationsService
            .getListFuelCardApplicationByCustomerId(page, this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.listApplications = res;
                if (
                    res.items.length > 0 &&
                    res.items.find((obj) => obj.status === 'Declined')
                ) {
                    this.hasDeclinedApp = true;
                }
                if (
                    res.items.length > 0 &&
                    res.items.every((obj) => obj.status === 'Declined')
                ) {
                    this.allDeclinedApp = true;
                }
            });
    }
    onRowSelect(id) {
        this.router.navigate([
            '/credit-application/fuel-card/list/detail/' + id,
        ]);
    }
    checkPermission() {
        const userAuthData = this.authService.getUserData();
        this.canresetDeclinedApp = checkRolePermission(userAuthData.role, [
            'credit_specialist_admin',
        ]);
    }
    resetDeclinedApp() {
        this.fuelCardApplicationsService
            .resetDeclinedFuelCardApplication(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toaster.success('Время блокировки успешно сброшено!');
                },
            });
    }
    getFuelCardCreditLineStatus() {
        this.fuelCardApplicationsService
            .getFuelCardCreditLineStatus(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.fuelCardCreditLineData = data;
            });
    }
    closeFuelCardCreditLine() {
        this.fuelCardApplicationsService
            .closeFuelCardCreditLine(
                this.fuelCardCreditLineData.creditLineDetails.id
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toastService.success(
                    'Вы успешно закрыли топливную карту!'
                );
                this.getFuelCardCreditLineStatus();
            });
    }
    ngOnInit(): void {
        this.getFuelCardCreditLineStatus();
        this.getListApplications();
        this.checkPermission();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
