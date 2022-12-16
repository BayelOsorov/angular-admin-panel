import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-credit-application-detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditApplicationDetailInfoComponent implements OnInit {
    data = {
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
        pin: 'string',
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
    constructor() {}

    ngOnInit(): void {}
}
