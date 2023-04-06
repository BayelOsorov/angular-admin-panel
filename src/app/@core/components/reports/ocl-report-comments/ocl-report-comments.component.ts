import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditApplicationService } from '../../../services/credit-application/credit-application.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export const appAnswerCategories = [
    { label: 'Скачал ради интереса', value: 'DownloadedForInterest' },
    {
        label: 'Завершит позже, не оказалась подтверждающих документов рядом',
        value: 'FinishLaterDoNotHaveDocuments',
    },
    {
        label: 'Завершит позже сейчас нет времени',
        value: 'FinishLaterDoNotHaveFreeTime',
    },
    {
        label: 'Уже не требуется',
        value: 'NoLoggerNeeded',
    },
    {
        label: 'Завершит заявку на кредит в скором времени',
        value: 'WillCompleteSoon',
    },
    {
        label: 'Требовалась помощь по заполнению - помогли',
        value: 'NeededHelpFillingOut',
    },
    {
        label: 'Негативный отзыв',
        value: 'NegativeFeedback',
    },
    {
        label: 'Завершит в магазине перед покупкой',
        value: 'FinishedInShopBeforeShopping',
    },
    {
        label: 'Другое',
        value: 'Other',
    },
];
@Component({
    selector: 'ngx-ocl-report-comments',
    templateUrl: './ocl-report-comments.component.html',
    styleUrls: ['./ocl-report-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OclReportCommentsComponent implements OnInit, OnDestroy {
    customerId;
    listComments;
    selectOptions = appAnswerCategories;
    form = this.fb.group({
        body: ['', Validators.required],
        operationType: [10, Validators.required],
        callAnswerCategory: ['', Validators.required],
    });
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private creditApplicationService: CreditApplicationService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public router: Router,
        private cdr: ChangeDetectorRef
    ) {}
    getListOclComments() {
        this.creditApplicationService
            .getListReportComments(this.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
            });
    }
    sendComment() {
        this.creditApplicationService
            .sendReportComment(this.customerId, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно отправлено!');
                this.form.reset('');
                this.getListOclComments();
            });
    }
    createOclAccount() {
        this.creditApplicationService
            .getCreditSpecialistAccount()
            .toPromise()
            .then(() => {})
            .catch((e) => {});
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.customerId = params['id'];
        });
        this.createOclAccount();
        this.getListOclComments();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
