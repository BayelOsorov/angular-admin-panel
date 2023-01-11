import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICreditApplicationDetail } from '../../../models/credit-application/credit-application';
import { AuthService } from '../../../services/auth/auth.service';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';
import { OldBackendService } from '../../../services/old-backend/old-backend.service';

@Component({
    selector: 'ngx-credit-application-detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.scss'],
})
export class CreditApplicationDetailInfoComponent implements OnInit, OnDestroy {
    @Input() data: ICreditApplicationDetail;
    @Input() dataScoring;
    blackListPerson;
    taxPayer;
    personalInfo = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        fio: 'Surname Name Patronymic',
        createdAt: '2022-12-08T03:53:54.122Z',
        photoIdentificationDeclinedAt: '2022-12-08T03:53:54.122Z',
        photoIdentificationApprovedAt: '2022-12-08T03:53:54.122Z',
        videoIdentificationApprovedAt: '2022-12-08T03:53:54.122Z',
        videoIdentificationRequestedAt: '2022-12-08T03:53:54.122Z',
        videoIdentificationDeclinedAt: '2022-12-08T03:53:54.122Z',
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        phoneNumber: '+996505505505',
        status: 'PhotoIdentificationRequest',
        passportFrontSideImageUrl: 'string',
        passportBackSideImageUrl: 'string',
        selfieWithPassportImageUrl: 'string',
        currentProcessor: {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            fullname: 'string',
        },
        pin: '20609197400435',
        documentType: 'AN',
        documentNumber: 'string',
        address: {
            region: 'string',
            locality: 'string',
            street: 'string',
        },
        processors: [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                createdAt: '2022-12-08T03:53:54.122Z',
                identificationRequestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                type: 'PhotoIdentification',
                processor: {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    fullname: 'string',
                },
                processorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            },
        ],
        previousStates: [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                createdAt: '2022-12-08T03:53:54.122Z',
                passportFrontSideImageUrl: 'string',
                passportBackSideImageUrl: 'string',
                selfieWithPassportImageUrl: 'string',
                pin: 'string',
                documentType: 'AN',
                documentNumber: 'string',
                address: {
                    region: 'string',
                    locality: 'string',
                    street: 'string',
                },
            },
        ],
        requireEditNotes: [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                createdAt: '2022-12-08T03:53:54.122Z',
                processor: {
                    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    fullname: 'string',
                },
                processorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                editRequiredProperties: {
                    additionalProp1: ['string'],
                    additionalProp2: ['string'],
                    additionalProp3: ['string'],
                },
                identificationRequestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            },
        ],
        videoIdentificationCallFiles: [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                createdAt: '2022-12-08T03:53:54.122Z',
                url: 'string',
            },
        ],
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private applicationRequestsService: ApplicationRequestsService,
        private api: OldBackendService,
        private authService: AuthService
    ) {}
    getStatus() {
        switch (this.data.status) {
            case 'InProcess':
                return { status: 'primary', title: 'Ожидание' };
                break;

            default:
                break;
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
            .getTaxInspectionTaxPayer(this.personalInfo.pin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.taxPayer = data;
                },
            });
    }
    dowloadCredit() {
        fetch(this.data.debtorInformationReportUrl, {
            headers: {
                Authorization: 'Bearer ' + this.authService.getAccessToken(),
                responseType: 'blob',
            },
        })
            .then((res) => res.blob())
            .then((myBlob) => {
                const pdf = window.URL.createObjectURL(myBlob);
                console.log(pdf);
                window.open(pdf);
            });
        // window.open(this.data.debtorInformationReportUrl, '_blank');
    }
    ngOnInit(): void {
        this.getBlackListPerson();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
