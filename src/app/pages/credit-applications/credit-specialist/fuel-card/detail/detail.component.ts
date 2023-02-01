import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    ICreditApplicationDetail,
    IScoringCreditApplication,
} from '../../../../../@core/models/credit-application/credit-application';
import { IPersonalData } from '../../../../../@core/models/identification/identification';
import { CreditApplicationService } from '../../../../../@core/services/credit-application/credit-application.service';
import { IdentificationService } from '../../../../../@core/services/identification/identification.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cleanEmptyKeyInObj } from '../../../../../@core/utils';
import { ApplicationRequestsService } from '../../../../../@core/services/credit-application/credit.service';
import { FuelCardApplicationService } from '../../../../../@core/services/credit-application/fuel-card.service';
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class FuelCardApplicationDetailComponent implements OnInit, OnDestroy {
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    kibData;
    requestingAmount: number;
    customerData: FormGroup;
    customerInfo;
    requestingAmountData;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        public router: Router,
        private toaster: ToastrService,
        private fb: FormBuilder,
        private location: Location,
        private creditApplicationsService: CreditApplicationService,
        private fuelCardApplicationsService: FuelCardApplicationService,

        private creditService: ApplicationRequestsService,

        private identificationService: IdentificationService
    ) {}
    loanApplication() {
        this.fuelCardApplicationsService
            .getFuelCardApplicationDetail()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.loanApplicationData = data;
                    this.requestingAmount = data.requestingAmount;
                    this.getCreditLine(data.customerId);
                    this.getScoring(data.id);
                    this.generateControls();
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
                    this.customerInfo = data;
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
    changeAmount(val) {
        this.requestingAmount = val;
    }
    sendComment(data) {
        this.fuelCardApplicationsService
            .sendCommentFuelCardApplication(this.loanApplicationData.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {},
            });
    }

    getRequestingAmount() {
        this.requestingAmountData = {
            min: 1000,
            max: this.loanApplicationData.requestingAmount,
            requestingAmount: this.loanApplicationData.requestingAmount,
            isAdmin: true,
        };
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
    generateControls() {
        if (this.loanApplicationData.customerData.additionalIncomes) {
            Object.values(
                this.loanApplicationData.customerData.additionalIncomes
            ).map((item, i) =>
                this.customerData.addControl(
                    `CustomerData.AdditionalIncomes[${i}].Value.Work`,

                    new FormControl([])
                )
            );
        }
        if (this.loanApplicationData.customerData.spouseData) {
            Object.values(
                this.loanApplicationData.customerData.spouseData.incomes
            ).map((item, i) =>
                this.customerData.addControl(
                    `CustomerData.SpouseData.Incomes[${i}].Value.Work`,

                    new FormControl([])
                )
            );
        }
        if (this.loanApplicationData.customerData.realEstates) {
            Object.values(
                this.loanApplicationData.customerData.realEstates
            ).map((item, i) =>
                this.customerData.addControl(
                    `CustomerData.RealEstates[${i}].Value.Address`,
                    new FormControl([])
                )
            );
        }
        if (this.loanApplicationData.customerData.personalEstates) {
            Object.values(
                this.loanApplicationData.customerData.personalEstates
            ).map((item, i) =>
                this.customerData.addControl(
                    `CustomerData.PersonalEstates[${i}].Value.Model`,
                    new FormControl([])
                )
            );
        }
    }
    ngOnInit(): void {
        this.loanApplication();
        this.customerData = this.fb.group({
            'CustomerData.DurationOfActualResidenceLocation': [[]],
            'CustomerData.DependentsCount': [[]],
            'CustomerData.EducationDegree': [[]],
            'CustomerData.MaritalStatus': [[]],
            // Occupation
            'CustomerData.Occupation.Income': [[]],
            'CustomerData.Occupation.WorkAddress': [[]],
            'CustomerData.Occupation.WorkExperience': [[]],
            'CustomerData.Occupation.Position': [[]],
            'CustomerData.Occupation.Type': [[]],
            'CustomerData.Occupation.Description': [[]],
            'CustomerData.Occupation.Company': [[]],
            // SpouseData
            'CustomerData.SpouseData.Surname': [[]],
            'CustomerData.SpouseData.PhoneNumber': [[]],
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
