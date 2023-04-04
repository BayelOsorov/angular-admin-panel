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
const selectOptions = [
    { label: 'Случайно скачал', value: '10' },
    { label: 'Не было время пройти фото видео идентификацию', value: '20' },
    {
        label: 'Перезвоните позже (утром, вечером, через час, завтра)',
        value: '30',
    },
    { label: 'Дозвонились (сбросил)', value: '40' },
    { label: 'Дозвонились (ответил другое лицо)', value: '50' },
    { label: 'Не отвечает', value: '60' },
    { label: 'Не дозвонились (сбросил)', value: '70' },
    { label: 'Не дозвонились (отключен/недоступен)', value: '80' },
    { label: 'Не дозвонились (не обслуживается)', value: '90' },
    { label: 'Напишите на whatsapp/telegram', value: '100' },
    { label: 'Другое', value: '110' },
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
    selectOptions;
    form = this.fb.group({
        body: ['', Validators.required],
        operationType: [10, Validators.required],
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
