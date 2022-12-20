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

@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class CreditApplicationDetailComponent implements OnInit {
    loanApplicationData: ICreditApplicationDetail;
    scoringData: IScoringCreditApplication;
    personalData: IPersonalData;
    requestingAmount: number;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        public router: Router,
        private toaster: ToastrService,
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
                    console.log(data);

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
                    this.scoringData = data;
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
                next: (data) => {
                    console.log(data);
                },
            });
    }
    ngOnInit(): void {
        this.loanApplication();
    }
}
