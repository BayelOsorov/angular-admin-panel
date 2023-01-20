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
import { FuelCardApplicationService } from '../../../../../@core/services/credit-application/fuel-card.service';
@Component({
    templateUrl: './detail-fuel-card-application.component.html',
    styleUrls: ['./detail-fuel-card-application.component.scss'],
})
export class DetailFuelCardApplicationAdminComponent
    implements OnInit, OnDestroy
{
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    kibData;
    customerData;
    requestingAmountData;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private fuelCardApplicationsService: FuelCardApplicationService,
        private creditService: ApplicationRequestsService
    ) {}
    loanApplication(id) {
        this.fuelCardApplicationsService
            .getFuelCardApplicationDetailAdmin(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.loanApplicationData = data;
                    this.getCreditLine(data.customerId);
                    this.getScoring(data.id);
                    this.getCustomerData(data.customerId);
                    this.getRequestingAmount();
                },
            });
    }
    getScoring(id) {
        this.fuelCardApplicationsService
            .getFuelCardApplicationScoring(id)
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
            .getCustomerCreditLines('2ea78f5f-886e-4caf-9cbd-6073b0f68e71')
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.kibData = data;
                },
            });
    }

    sendComment(data) {
        this.fuelCardApplicationsService
            .sendCommentFuelCardApplication(this.loanApplicationData.id, {
                data,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {},
            });
    }
    getRequestingAmount() {
        this.requestingAmountData = {
            min: 1000,
            max: this.loanApplicationData.requestingAmount,
            requestingAmount: this.loanApplicationData.approvedAmount
                ? this.loanApplicationData.approvedAmount
                : this.loanApplicationData.requestingAmount,
            isAdmin: true,
        };
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.loanApplication(params['id']);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
