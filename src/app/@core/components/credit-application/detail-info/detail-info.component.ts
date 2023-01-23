import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICreditApplicationDetail } from '../../../models/credit-application/credit-application';
import { AuthService } from '../../../services/auth/auth.service';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';
import { OldBackendService } from '../../../services/old-backend/old-backend.service';
import { downloadFile } from '../../../utils';

@Component({
    selector: 'ngx-credit-application-detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.scss'],
})
export class CreditApplicationDetailInfoComponent implements OnInit, OnDestroy {
    @Input() data: ICreditApplicationDetail;
    @Input() dataScoring;
    @Input() kibData;
    @Input() customerData;

    blackListPerson;
    taxPayer;
    creditReportUrl;
    trustLevel;
    repaymentDays;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private applicationRequestsService: ApplicationRequestsService,
        private api: OldBackendService,
        private authService: AuthService
    ) {}
    getTrustLevel() {
        const score = this.dataScoring.score;
        if (score <= 200) {
            this.trustLevel = {
                status: 'danger',
                text: 'Низкий уровень доверия',
            };
        }
        if (score > 200 && score < 600) {
            this.trustLevel = {
                status: 'warning',
                text: 'Средний уровень доверия',
            };
        }
        if (score >= 600) {
            this.trustLevel = {
                status: 'success',
                text: 'Высокий уровень доверия',
            };
        }
    }
    getStatus() {
        switch (this.data.status) {
            case 'InProcess':
                return { status: 'primary', title: 'Ожидание' };

            case 'Declined':
                return { status: 'danger', title: 'Отклоненный' };
            case 'EditRequired':
                return { status: 'warning', title: 'Нужно отредактировать' };
            case 'Timeout':
                return { status: 'secondary', title: 'Время и стекло' };
            case 'Requested':
                return { status: 'primary', title: 'Ожидание' };
            case 'Approved':
                return { status: 'success', title: 'Одобренный' };

            default:
                return { status: 'primary', title: '' };
        }
    }
    getBlackListPerson() {
        this.applicationRequestsService
            .getBlackListPerson('Генри Сехудо')
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.blackListPerson = data;
                },
            });
    }
    getTaxInspectionTaxPayer() {
        this.applicationRequestsService
            .getTaxInspectionTaxPayer(
                this.customerData.identificationInformation.pin
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.taxPayer = data;
                },
            });
    }
    getCustomerRepDelays() {
        this.applicationRequestsService
            .getCustomerRepaymentDelays(this.data.customerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.repaymentDays = data;
                },
            });
    }

    getCreditReport() {
        fetch(this.data.debtorInformationReportUrl, {
            headers: {
                Authorization: 'Bearer ' + this.authService.getAccessToken(),
                responseType: 'blob',
            },
        })
            .then((res) => res.blob())
            .then((myBlob) => {
                this.creditReportUrl = window.URL.createObjectURL(myBlob);
            });
    }
    dowloadCredit() {
        downloadFile(
            this.creditReportUrl,
            `Кредитный-Отчет:${
                this.customerData.identificationInformation.surname +
                '-' +
                this.customerData.identificationInformation.name +
                '-' +
                this.customerData.identificationInformation.patronymic
            }`
        );
        // window.open(this.data.debtorInformationReportUrl, '_blank');
    }
    ngOnInit(): void {
        this.getCustomerRepDelays();
        this.getTrustLevel();
        this.getBlackListPerson();
        this.getCreditReport();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
