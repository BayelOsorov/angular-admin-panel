/* eslint-disable brace-style */
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBadgeComponent } from '../../../../../@core/components/shared/status-badge/status-badge.component';
import { IncreaseLimitApplicationService } from '../../../../../@core/services/credit-application/increase-limit.service';
import { tableNumbering } from '../../../../../@core/utils';
@Component({
    templateUrl: './list-increase-limit-applications.component.html',
    styleUrls: ['./list-increase-limit-applications.component.scss'],
})
export class ListIncreaseLimitApplicationsAdminComponent
    implements OnInit, OnDestroy
{
    listApplications;
    localities = [];
    form = this.fb.group({
        from: [''],
        to: [''],
        surname: [''],
        name: [''],
        patronymic: [''],
        phoneNumber: [''],
        status: ['Requested'],
        page: [1],
    });
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
        customerFullName: {
            title: 'ФИО',
            type: 'text',
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
        private increaseLimitApplicationsService: IncreaseLimitApplicationService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.increaseLimitApplicationsService
            .getListCreditApplication(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }
    goToDetail() {}
    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getListApplications();
            });
        this.getListApplications();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
