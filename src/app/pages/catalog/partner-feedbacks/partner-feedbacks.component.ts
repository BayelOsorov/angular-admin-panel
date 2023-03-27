import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomDatePipe } from '../../../@core/components/shared/date-pipe/date.pipe';
import { StatusBadgeComponent } from '../../../@core/components/shared/status-badge/status-badge.component';
import { IListPartnerFeedbacks } from '../../../@core/models/catalog/partners';
import { PartnerFeedbacksService } from '../../../@core/services/catalog/partner-feedbacks/partner-feedbacks.service';
import { PartnersService } from '../../../@core/services/catalog/partners/partners.service';
import { tableNumbering, truncateText } from '../../../@core/utils';
@Component({
    templateUrl: './partner-feedbacks.component.html',
    styleUrls: ['./partner-feedbacks.component.scss'],
})
export class PartnerFeedbacksComponent implements OnInit, OnDestroy {
    listPartnerFeedbacks: IListPartnerFeedbacks;
    partners;
    form = this.fb.group({
        passedModeration: [''],
        partnerId: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartnerFeedbacks.page, cell.row.index),
        },
        comment: {
            title: 'Текст',
            type: 'html',
            valuePrepareFunction: (item) =>
                `<div title='${item}'>${truncateText(item)}</div>`,
        },
        createDateTime: {
            title: 'Дата',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },

        partner: {
            title: 'Партнер',
            type: 'text',
            valuePrepareFunction: (item) => item.name,
        },
        // passedModeration: {
        //     title: 'Статус',
        //     type: 'text',
        //     valuePrepareFunction: (bool) => (bool ? 'Одобренный' : 'Ожидание'),
        // },
        passedModeration: {
            title: 'Статус',
            type: 'custom',
            renderComponent: StatusBadgeComponent,
        },
    };

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerFeedbacksService: PartnerFeedbacksService,
        private partnerService: PartnersService,
        private datePipe: CustomDatePipe,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getPartnerFeedbacks(page = 1, filter = {}) {
        this.partnerFeedbacksService
            .getListPartnerFeedbacks(page, filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPartnerFeedbacks = res));
    }
    onSearch(event) {
        this.getPartnerFeedbacks(1, event);
    }
    updatePartnerFeedback(data) {
        this.router.navigate([`catalog/partner-feedbacks/detail/${data.id}`]);
    }
    userRowSelect(id) {
        this.router.navigate([`catalog/partner-feedbacks/detail/${id}`]);
    }
    deletePartnerFeedback(data) {
        this.partnerFeedbacksService
            .deletePartnerFeedback(data.partner.id, data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getPartnerFeedbacks();
            });
    }
    getPartners(name = '') {
        this.partnerService
            .getListPartners(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.partners = res.items));
    }

    ngOnInit(): void {
        this.getPartnerFeedbacks();
        this.getPartners();
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getPartnerFeedbacks(1, data);
            });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
