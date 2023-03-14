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
import { CreditApplicationService } from '../../../../../@core/services/credit-application/credit-application.service';
import { ApplicationRequestsService } from '../../../../../@core/services/credit-application/credit.service';
import { IdentificationService } from '../../../../../@core/services/identification/identification.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cleanEmptyKeyInObj } from '../../../../../@core/utils';
import { ToastrService } from 'ngx-toastr';
import { accessLevel } from '../../../../../@core/utils/helpers';
import { AuthService } from '../../../../../@core/services/auth/auth.service';
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
    requestingAmount;
    loanId;
    customerDataForm: FormGroup;
    userData;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private fuelCardApplicationsService: FuelCardApplicationService,
        private creditService: ApplicationRequestsService,
        private authService: AuthService,
        private toaster: ToastrService,
        private fb: FormBuilder
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
            .getCustomerCreditLines(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.kibData = data;
                },
            });
    }

    sendComment(data) {
        this.fuelCardApplicationsService
            .sendCommentFuelCardApplication(this.loanApplicationData.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.loanApplication(this.loanId);
                },
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
            status: this.loanApplicationData.status,
        };
    }

    changeAmount(val) {
        this.requestingAmount = val;
    }

    approveCredit() {
        this.fuelCardApplicationsService
            .approveFuelCardApplication(this.loanApplicationData.id, {
                approvedAmount: this.requestingAmount,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.toaster.success(
                        'Вы успешно подтвердили заявку на кредит!'
                    );
                    this.location.back();
                },
            });
    }
    declineCredit(lockoutEndData) {
        this.fuelCardApplicationsService
            .declineFuelCardApplication(
                this.loanApplicationData.id,
                lockoutEndData
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.toaster.success(
                        'Вы успешно отклонили заявку на кредит!'
                    );
                    this.location.back();
                },
            });
    }
    needToEditUser() {
        this.fuelCardApplicationsService
            .needToEditFuelCardApplication(this.loanApplicationData.id, {
                editRequiredProperties: cleanEmptyKeyInObj(
                    this.customerData.value
                ),
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.toaster.success(
                        'Вы успешно отправили на редактирование заявку на кредит!'
                    );
                    this.location.back();
                },
            });
    }
    getFuelCardCreditSpecialistAccount() {
        this.fuelCardApplicationsService
            .getFuelCardSpecialistAccount()
            .toPromise()
            .then()
            .catch((e) => {
                if (e.status === 0) {
                    this.createFuelCardCreditSpecialistAccount();
                }
            });
    }

    createFuelCardCreditSpecialistAccount() {
        this.fuelCardApplicationsService
            .createFuelCardSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.loanId = params['id'];
            this.loanApplication(this.loanId);
        });
        this.userData = this.authService.getUserData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
