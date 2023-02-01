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
@Component({
    templateUrl: './detail-credit-application.component.html',
    styleUrls: ['./detail-credit-application.component.scss'],
})
export class DetailCreditApplicationAdminComponent
    implements OnInit, OnDestroy
{
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    kibData;
    customerData;
    requestingAmountData;
    requestingAmount;
    customerDataForm: FormGroup;
    userData;
    hasCreditSpecialistRole: boolean;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private creditApplicationsService: CreditApplicationService,
        private creditService: ApplicationRequestsService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private authService: AuthService,

        private identificationService: IdentificationService
    ) {}
    loanApplication(id) {
        this.creditApplicationsService
            .getCreditApplicationDetailAdmin(id)
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
        this.creditApplicationsService
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
                next: (data) => {
                    this.kibData = data;
                },
            });
    }

    sendComment(data) {
        this.creditApplicationsService
            .sendCommentCreditApplication(this.loanApplicationData.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {},
            });
    }

    getRequestingAmount() {
        this.requestingAmountData = {
            min: 5000,
            //  approvedAmount сколько ему одобрили, нужно при статусе - Approved
            max: this.loanApplicationData.requestingAmount,
            requestingAmount: this.loanApplicationData.approvedAmount
                ? this.loanApplicationData.approvedAmount
                : this.loanApplicationData.requestingAmount,
            isAdmin: false,
        };
    }

    approveCredit() {
        this.creditApplicationsService
            .approveCreditApplication(this.loanApplicationData.id, {
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
    declineCredit(lockoundEndData) {
        this.creditApplicationsService
            .declineCreditApplication(
                this.loanApplicationData.id,
                lockoundEndData
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
        this.creditApplicationsService
            .needToEditCreditApplication(this.loanApplicationData.id, {
                editRequiredProperties: cleanEmptyKeyInObj(
                    this.customerDataForm.value
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
    changeAmount(val) {
        this.requestingAmount = val;
    }

    getCreditSpecialistAccount() {
        this.creditApplicationsService
            .getCreditSpecialistAccount()
            .toPromise()
            .then((res) => console.log(res))
            .catch((e) => {
                console.log(e, ' fuel card');
                if (e.status === 403) {
                    this.createCreditSpecialistAccount();
                }
            });
    }

    createCreditSpecialistAccount() {
        this.creditApplicationsService
            .createCreditSpecialistAccount()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {},
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.loanApplication(params['id']);
        });
        this.userData = this.authService.getUserData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
