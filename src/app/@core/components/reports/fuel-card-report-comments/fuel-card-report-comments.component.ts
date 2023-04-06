import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appAnswerCategories } from '../ocl-report-comments/ocl-report-comments.component';
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
    selector: 'ngx-fuel-card-report-comments',
    templateUrl: './fuel-card-report-comments.component.html',
    styleUrls: ['./fuel-card-report-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelCardReportCommentsComponent implements OnInit, OnDestroy {
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
        private fuelCardApplicationService: FuelCardApplicationService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public router: Router,
        private cdr: ChangeDetectorRef
    ) {}
    getListFuelComments() {
        this.fuelCardApplicationService
            .getListReportComments(this.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
            });
    }
    sendComment() {
        this.fuelCardApplicationService
            .sendReportComment(this.customerId, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно отправлено!');
                this.form.reset('');
                this.getListFuelComments();
            });
    }
    createFuelAccount() {
        this.fuelCardApplicationService
            .getFuelCardSpecialistAccount()
            .toPromise()
            .then(() => {})
            .catch((e) => {});
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.customerId = params['id'];
        });
        this.createFuelAccount();
        this.getListFuelComments();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
