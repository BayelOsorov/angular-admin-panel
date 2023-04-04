/* eslint-disable brace-style */
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IPersonalData } from '../../../../../@core/models/identification/identification';
import {
    ICreditApplicationDetail,
    IScoringCreditApplication,
} from '../../../../../@core/models/credit-application/credit-application';
import { ApplicationRequestsService } from '../../../../../@core/services/credit-application/credit.service';
import { IdentificationService } from '../../../../../@core/services/identification/identification.service';
import { IncreaseLimitApplicationService } from '../../../../../@core/services/credit-application/increase-limit.service';
@Component({
    templateUrl: './detail-increase-limit-application.component.html',
    styleUrls: ['./detail-increase-limit-application.component.scss'],
})
export class DetailIncreaseLimitApplicationAdminComponent
    implements OnInit, OnDestroy
{
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    kibData;
    customerData;
    loanId;
    requestingAmountData;
    requestingAmount;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private increaseLimitApplicationsService: IncreaseLimitApplicationService,
        private creditService: ApplicationRequestsService,

        private identificationService: IdentificationService
    ) {}
    loanApplication(id) {
        this.increaseLimitApplicationsService
            .getCreditApplicationDetailAdmin(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.loanApplicationData = data;
                    this.getCreditLine(data.customerId);
                    this.getScoring(data.id);
                    this.getCustomerData(data.customerId);
                },
            });
    }
    getScoring(id) {
        this.increaseLimitApplicationsService
            .getCreditApplicationScoring(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.dataScoring = data;
                },
            });
    }

    getCustomerData(id) {
        this.creditService
            .getCustomerData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.customerData = data;
                },
            });
    }
    getCreditLine(id) {
        this.creditService
            .getCustomerCreditLines(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: [any]) => {
                    this.kibData = data;

                    data.forEach((item) => {
                        if (item.productCode === 'Charmander') {
                            this.requestingAmountData = {
                                max: this.loanApplicationData.requestingAmount,
                                requestingAmount: this.loanApplicationData
                                    .approvedAmount
                                    ? this.loanApplicationData.approvedAmount
                                    : this.loanApplicationData.requestingAmount,
                                isAdmin: true,
                                min: item.limit,
                                status: this.loanApplicationData.status,
                            };
                        }
                    });
                },
            });
    }

    sendComment(data) {
        this.increaseLimitApplicationsService
            .sendCommentCreditApplication(this.loanApplicationData.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.loanApplication(this.loanId);
                },
            });
    }
    changeAmount(val) {
        this.requestingAmount = val;
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.loanId = params['id'];
            this.loanApplication(this.loanId);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
