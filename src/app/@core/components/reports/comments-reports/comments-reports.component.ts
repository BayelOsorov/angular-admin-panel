import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    AfterViewChecked,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreditApplicationService } from '../../../services/credit-application/credit-application.service';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';
import { IdentificationService } from '../../../services/identification/identification.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
    selector: 'ngx-comments-reports',
    templateUrl: './comments-reports.component.html',
    styleUrls: ['./comments-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsReportsComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    form;
    customerId;
    isIdentified;
    endUrl;
    listComments;
    userData;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private fuelCardApplicationService: FuelCardApplicationService,
        private creditApplicationService: CreditApplicationService,
        private identificationService: IdentificationService,
        private route: ActivatedRoute,
        private toaster: ToastrService,
        public router: Router,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}
    sortArray = (arr) =>
        arr.sort(
            (a, b) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
        );
    sendComment() {
        this.form.controls.body.setValue(this.form.value.body[0]);
        this.handleEndUrl({
            '0-0-3': [() => this.sendOclComment()],
            'fuel-card': [() => this.sendFuelComment()],
            identification: [() => this.sendIdentificationComment()],
        });
    }
    getListOclComments() {
        this.creditApplicationService
            .getListReportComments(this.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
            });
    }
    getListFuelComments() {
        this.fuelCardApplicationService
            .getListReportComments(this.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
            });
    }
    getListIdentificationComments() {
        this.identificationService
            .getListReportCommentIdentification(this.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listComments = data;
                this.cdr.markForCheck();
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
                    this.getListOclComments();
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
                    this.getListFuelComments();
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
                    this.getListIdentificationComments();
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
    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =
                this.myScrollContainer.nativeElement.scrollHeight;

            this.cdr.markForCheck();
        } catch (err) {}
    }
    ngAfterViewChecked() {
        console.log('ss');

        this.scrollToBottom();
    }
    trackByFn(index, item) {
        return item.id;
    }
    ngOnInit(): void {
        this.endUrl = this.router.url.split('/')[2];
        this.userData = this.authService.getUserData();
        this.form = this.fb.group({
            body: ['', Validators.required],
            operationType: [10, Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.customerId = params['id'];
            this.isIdentified = params['isIdentified'];
        });
        this.handleEndUrl({
            '0-0-3': [() => this.getListOclComments()],
            'fuel-card': [() => this.getListFuelComments()],
            identification: [() => this.getListIdentificationComments()],
        });
    }
}
