import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditApplicationService } from '../../../services/credit-application/credit-application.service';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';
import { IdentificationService } from '../../../services/identification/identification.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'ngx-comments-reports',
    templateUrl: './comments-reports.component.html',
    styleUrls: ['./comments-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsReportsComponent implements OnInit {
    form;
    customerId;
    isIdentified;
    endUrl;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private fuelCardApplicationService: FuelCardApplicationService,
        private creditApplicationService: CreditApplicationService,
        private identificationService: IdentificationService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public router: Router
    ) {}
    sendComment() {
        this.form.controls.body.setValue(this.form.value.body[0]);
        this.handleEndUrl({
            '0-0-3': [() => this.sendOclComment()],
            'fuel-card': [() => this.sendFuelComment()],
            identification: [() => this.sendIdentificationComment()],
        });
    }
    sendOclComment() {
        if (this.form.valid) {
            this.creditApplicationService
                .sendReportComment(this.customerId, this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно отправлено!');
                    this.form.controls.body.setValue('');
                });
        }
    }
    sendFuelComment() {
        if (this.form.valid) {
            this.fuelCardApplicationService
                .sendReportComment(this.customerId, this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно отправлено!');
                    this.form.controls.body.setValue('');
                });
        }
    }
    sendIdentificationComment() {
        if (this.form.valid) {
            this.identificationService
                .sendReportCommentIdentification(
                    this.customerId,
                    Boolean(JSON.parse(this.isIdentified))
                        ? { ...this.form.value, operationType: 20 }
                        : this.form.value
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно отправлено!');
                    this.form.controls.body.setValue('');
                });
        }
    }
    handleEndUrl(handlers) {
        if (handlers.hasOwnProperty(this.endUrl)) {
            const handler = handlers[this.endUrl];
            if (typeof handler === 'function') {
                handler.call(this);
            } else if (Array.isArray(handler)) {
                handler.forEach(
                    (fn) => typeof fn === 'function' && fn.call(this)
                );
            }
        }
    }
    ngOnInit(): void {
        this.endUrl = this.router.url.split('/')[2];

        this.form = this.fb.group({
            body: ['', Validators.required],
            operationType: [10, Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.customerId = params['id'];
            this.isIdentified = params['isIdentified'];
        });
    }
}
