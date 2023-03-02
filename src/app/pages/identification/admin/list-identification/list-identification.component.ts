import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBadgeComponent } from '../../../../@core/components/shared/status-badge/status-badge.component';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-identification.component.html',
    styleUrls: ['./list-identification.component.scss'],
})
export class ListIdentificationComponent implements OnInit, OnDestroy {
    listApplications;
    localities = [];
    form = this.fb.group({
        pin: [''],
        phoneNumber: [''],
        status: ['PhotoIdentificationRequest'],
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

        phoneNumber: {
            title: 'Номер телефона',
            type: 'html',
            valuePrepareFunction: (item) => ` <a
                          href='tel:${item}'
                          rel="noopener noreferrer"
                          target="_blank"
                          class='color-a'
                        >
                          +${item}
                        </a>`,
        },
        createdAt: {
            title: 'Дата',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
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
        private identificationService: IdentificationService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.identificationService
            .getListIdentification(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listApplications = res));
    }
    onRowSelect(id) {
        this.router.navigate(['/identification/list/detail/' + id]);
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
