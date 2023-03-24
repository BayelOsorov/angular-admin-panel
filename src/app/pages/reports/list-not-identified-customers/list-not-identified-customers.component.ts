import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdentificationService } from '../../../@core/services/identification/identification.service';
import { tableNumbering } from '../../../@core/utils';
@Component({
    templateUrl: './list-not-identified-customers.component.html',
    styleUrls: ['./list-not-identified-customers.component.scss'],
})
export class ListNotIdentifiedCustomersComponent implements OnInit, OnDestroy {
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

        createdAt: {
            title: 'Дата создания',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
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
        // console.log(this.datePipe.transform(date, 'full'));

        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListApplications(page = 1) {
        this.identificationService
            .getListNoneIdentificateObservation(page, this.form.value)
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
