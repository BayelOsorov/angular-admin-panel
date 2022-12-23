import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    ICreditApplicationDetail,
    IScoringCreditApplication,
} from '../../../../@core/models/credit-application/credit-application';
import { IPersonalData } from '../../../../@core/models/identification/identification';
import { CreditApplicationService } from '../../../../@core/services/credit-application/credit-application.service';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class CreditApplicationDetailComponent implements OnInit, OnDestroy {
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    requestingAmount: number;
    customerData;
    occupation;
    additionalIncomes;
    spouseData;
    spouseDataIncomes;
    realEstates;
    personalEstates;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        public router: Router,
        private toaster: ToastrService,
        private fb: FormBuilder,
        private location: Location,
        private creditApplicationsService: CreditApplicationService,
        private identificationService: IdentificationService
    ) {}
    loanApplication() {
        this.creditApplicationsService
            .getCreditApplicationDetail()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.loanApplicationData = data;
                    this.requestingAmount = data.requestingAmount;

                    this.getScoring(data.id);
                    this.getDebtorInfoReport(data.id);
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
                    console.log(data);
                },
            });
    }
    getPersonalData(id) {
        this.identificationService
            .getUserPersonalData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.personalData = data;
                },
            });
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
    declineCredit() {
        this.creditApplicationsService
            .declineCreditApplication(this.loanApplicationData.id)
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
    changeAmount(val) {
        this.requestingAmount = val;
    }
    sendComment(data) {
        this.creditApplicationsService
            .sendCommentCreditApplication(this.loanApplicationData.id, {
                data,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {},
            });
    }
    getDebtorInfoReport(data) {
        this.creditApplicationsService
            .getCreditApplicationKib(this.loanApplicationData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data1) => {
                    console.log(data1);
                },
            });
    }
    ngOnInit(): void {
        this.loanApplication();
        this.customerData = this.fb.group({
            DurationOfActualResidenceLocation: [[]],
            ActualResidenceLocation: [[]],
            DependentsCount: [[]],
            EducationDegree: [[]],
            MaritalStatus: [[]],
        });
        this.occupation = this.fb.group({
            Income: [[]],
            WorkAddress: [[]],
            WorkExperience: [[]],
            Position: [[]],
            Type: [[]],
            Description: [[]],
            CertificateNumber: [[]],
        });
        this.additionalIncomes = this.fb.group({
            Work: [[]],
            Value: [[]],
        });
        this.spouseData = this.fb.group({
            Name: [[]],
            Surname: [[]],
            Patronymic: [[]],
            PhoneNumber: [[]],
        });
        this.spouseDataIncomes = this.fb.group({
            Work: [[]],
            Value: [[]],
        });
        this.realEstates = this.fb.group({
            Type: [[]],
            Address: [[]],
        });
        this.personalEstates = this.fb.group({
            Brand: [[]],
            Type: [[]],

            Model: [[]],
            ManufactureYear: this.fb.group({ Type: [[]] }),
        });
        console.log(this.personalEstates);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
