import {
    Component,
    OnDestroy,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tableNumbering } from '../../../utils';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';

@Component({
    selector: 'ngx-fuel-card-user-detail',
    templateUrl: './fuel-card-user-detail.component.html',
    styleUrls: ['./fuel-card-user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelCardUserDetailComponent implements OnInit, OnDestroy {
    @Input() kibData;
    @Input() userData;
    @Input() hasRoleToResetDeclinedApp;
    listApplications;
    fuelCardCreditLineData;
    canResetFuelCard = false;
    isLastDeclined = false;
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
        approvedAmount: {
            title: 'Одобренная сумма',
            type: 'text',
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

        private datePipe: DatePipe,
        private toastService: ToastrService,
        private cdr: ChangeDetectorRef
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

                if (res.items[0]?.status === 'Declined') {
                    this.isLastDeclined = true;
                }
                this.getFuelCardLockoutEndInfo();
                this.cdr.markForCheck();
            });
    }
    onRowSelect(id) {
        this.router.navigate([
            '/credit-application/fuel-card/list/detail/' + id,
        ]);
    }
    click() {
        console.log('sss');
    }

    resetDeclinedApp() {
        this.fuelCardApplicationsService
            .resetDeclinedFuelCardApplication(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toaster.success('Время блокировки успешно сброшено!');
                    this.getFuelCardLockoutEndInfo();
                },
            });
    }
    getFuelCardCreditLineStatus() {
        this.fuelCardApplicationsService
            .getFuelCardCreditLineStatus(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.fuelCardCreditLineData = data;
                this.cdr.markForCheck();
            });
    }
    getFuelCardLockoutEndInfo() {
        this.fuelCardApplicationsService
            .getLockoutEndFuelCardApplicationInfo(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: any) => {
                this.canResetFuelCard =
                    !this.fuelCardCreditLineData?.creditLineDetails?.isClosed &&
                    this.hasRoleToResetDeclinedApp &&
                    this.isLastDeclined &&
                    Boolean(data.oclRequestCreationLockoutEnd);

                this.cdr.markForCheck();
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
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
