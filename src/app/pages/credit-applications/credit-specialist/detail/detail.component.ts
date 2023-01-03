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
import {
    AbstractControl,
    Form,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class CreditApplicationDetailComponent implements OnInit, OnDestroy {
    loanApplicationData: ICreditApplicationDetail;
    dataScoring: IScoringCreditApplication;
    personalData: IPersonalData;
    requestingAmount: number;
    customerData: FormGroup;
    test;
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
                    this.generateControls();
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
    getDebtorInfoReport(id) {
        this.creditApplicationsService
            .getCreditApplicationBureauInfoReport(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (doc) => {
                    console.log(doc);

                    // const blob = window.URL.createObjectURL(data1);
                    // console.log(blob);
                },
            });
    }

    needToEditUser() {
        // const newCustomerData = Object.values(this.customerData.value).map(
        //     (item: Array<any>) =>
        //         item[0] === '' && item.length > 0 ? [] : item
        // );
        const newCustomerData = Object.keys(this.customerData.value).map(
            (item) => item
        );
        console.log(newCustomerData);

        // this.creditApplicationsService
        //     .needToEditCreditApplication(this.loanApplicationData.id, {
        //         editRequiredProperties: this.customerData.value,
        //     })
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe({
        //         next: (data) => {
        //             this.toaster.success(
        //                 'Вы успешно отправили на редактирование заявку на кредит!'
        //             );
        //             this.location.back();
        //         },
        //     });
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
                this.loanApplicationData.customerData.realEstates
            ).map((item, i) =>
                this.customerData.addControl(
                    `CustomerData.PersonalEstates[${i}].Value.Model`,
                    new FormControl([])
                )
            );
        }
        console.log(this.customerData);
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

// AdditionalIncomes: this.fb.group([
//     this.fb.group({
//         Value: this.fb.group({
//             Work: [[]],
//             Value: [[]],
//         }),
//     }),
//     this.fb.group({
//         Value: this.fb.group({
//             Work: [[]],
//             Value: [[]],
//         }),
//     }),
// ]),
// RealEstates: this.fb.group({
//     Type: [[]],
//     Address: [[]],
// }),
//  PersonalEstates: this.fb.group({
//     Brand: [[]],
//     Type: [[]],
//     Model: [[]],
//     ManufactureYear: [[]],
// }),
