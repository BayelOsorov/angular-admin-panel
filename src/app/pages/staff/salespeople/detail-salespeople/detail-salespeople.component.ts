import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalespeopleService } from '../../../../@core/services/staff/salespeople.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './detail-salespeople.component.html',
    styleUrls: ['./detail-salespeople.component.scss'],
})
export class DetailSalespeopleComponent implements OnInit, OnDestroy {
    listInvitedAccounts;
    localities = [];
    form = this.fb.group({
        from: [''],
        to: [''],
        inviterId: [''],
        page: [1],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(
                    this.listInvitedAccounts.pageNumber,
                    cell.row.index
                ),
        },

        createdAt: {
            title: 'Дата',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private salesPeopleService: SalespeopleService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private datePipe: DatePipe,
        private route: ActivatedRoute
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, hh:mm');
    }
    getListInvitedAccounts(page = 1) {
        this.salesPeopleService
            .getListInvitedAccounts(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listInvitedAccounts = res));
    }
    goToDetail() {
        console.log('sdsds');
    }
    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getListInvitedAccounts();
            });
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.form.controls['inviterId'].setValue(params['id']);
        });
        this.getListInvitedAccounts();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
