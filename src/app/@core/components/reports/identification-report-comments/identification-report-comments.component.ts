/* eslint-disable brace-style */
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IdentificationService } from '../../../services/identification/identification.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export const identificationAnswerCategories = [
    { label: 'Случайно скачал', value: 'AccidentallyDownloaded' },
    {
        label: 'Не было время пройти фото видео идентификацию',
        value: 'NoTimeForPhotoIdentification',
    },
    {
        label: 'Перезвоните позже (утром, вечером, через час, завтра)',
        value: 'CallBackLater',
    },
    { label: 'Дозвонились (сбросил)', value: 'CalledButHungUp' },
    {
        label: 'Дозвонились (ответил другое лицо)',
        value: 'CalledButAnotherPersonAnswered',
    },
    { label: 'Не отвечает', value: 'DoesNotAnswer' },
    { label: 'Не дозвонились (сбросил)', value: 'DidNotCalledBecauseHungUp' },
    {
        label: 'Не дозвонились (отключен/недоступен)',
        value: 'DidNotCalledBecauseDisable',
    },
    {
        label: 'Не дозвонились (не обслуживается)',
        value: 'DidNotCalledBecauseOutOfService',
    },
    { label: 'Напишите на whatsapp/telegram', value: 'WriteToMessengers' },
    { label: 'Другое', value: 'Other' },
];
@Component({
    selector: 'ngx-identification-report-comments',
    templateUrl: './identification-report-comments.component.html',
    styleUrls: ['./identification-report-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationReportCommentsComponent
    implements OnInit, OnDestroy
{
    customerId;
    listComments;
    isIdentified;
    selectOptions = identificationAnswerCategories;
    form = this.fb.group({
        body: ['', Validators.required],
        operationType: [10, Validators.required],
        callAnswerCategory: ['', Validators.required],
    });
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private identificationService: IdentificationService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public router: Router,
        private cdr: ChangeDetectorRef
    ) {}
    getListIdentificationComments() {
        const operationType = this.isIdentified
            ? 'HaveInProcessRequest'
            : 'DoNotHaveRequest';
        this.identificationService
            .getListReportCommentIdentification(this.customerId, operationType)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
            });
    }
    sendComment() {
        if (this.form.valid) {
            this.identificationService
                .sendReportCommentIdentification(
                    this.customerId,
                    this.isIdentified
                        ? { ...this.form.value, operationType: 20 }
                        : this.form.value
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно отправлено!');
                    this.form.reset('');

                    this.getListIdentificationComments();
                });
        }
    }
    createIdentificationAccount() {
        this.identificationService
            .getOperatorAccount()
            .toPromise()
            .then(() => {})
            .catch((e) => {});
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.customerId = params['id'];
            this.isIdentified = Boolean(JSON.parse(params['isIdentified']));
        });
        this.createIdentificationAccount();
        this.getListIdentificationComments();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
