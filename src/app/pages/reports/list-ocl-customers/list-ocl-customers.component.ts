import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomDatePipe } from '../../../@core/components/shared/date-pipe/date.pipe';
import { StatusBadgeComponent } from '../../../@core/components/shared/status-badge/status-badge.component';
import { CreditApplicationService } from '../../../@core/services/credit-application/credit-application.service';
import { tableNumbering } from '../../../@core/utils';
@Component({
    templateUrl: './list-ocl-customers.component.html',
    styleUrls: ['./list-ocl-customers.component.scss'],
})
export class ListOclCustomersComponent implements OnInit, OnDestroy {
    listApplications;
    localities = [];
    form = this.fb.group({
        minutes: [''],
        dateTime: [''],
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

        identifiedAt: {
            title: 'Прошел идентификацию',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
        customEl: {
            title: 'Подал заявку',
            type: 'text',
            valuePrepareFunction: (value, item) =>
                this.parseDate(item.identificationRequestDto.createdAt),
        },
        identificationRequestDto: {
            title: 'Статус',
            type: 'custom',
            valuePrepareFunction: (item) => item.actualOclRequestStatus,
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
        private creditApplicationService: CreditApplicationService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private datePipe: CustomDatePipe
    ) {}
    parseDate(date) {
        // console.log(this.datePipe.transform(date, 'full'));

        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.creditApplicationService
            .getListOclObservation(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }
    onRowSelect(id) {
        this.router.navigate(['/users/detail/' + id]);
    }
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
