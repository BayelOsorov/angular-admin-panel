export interface IIdentificationDetail {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    createdAt: '2022-11-17T08:48:45.048Z';
    photoIdentificationDeclinedAt: '2022-11-17T08:48:45.048Z';
    photoIdentificationApprovedAt: '2022-11-17T08:48:45.048Z';
    videoIdentificationApprovedAt: '2022-11-17T08:48:45.048Z';
    videoIdentificationRequestedAt: '2022-11-17T08:48:45.048Z';
    videoIdentificationDeclinedAt: '2022-11-17T08:48:45.048Z';
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    status: 'PhotoIdentificationRequest';
    passportFrontSideImageUrl: 'string';
    passportBackSideImageUrl: 'string';
    selfieWithPassportImageUrl: 'string';
    currentProcessor: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        fullname: 'string';
    };
    pin: 'string';
    documentType: 'AN';
    documentNumber: 'string';
    address: {
        region: 'string';
        locality: 'string';
        street: 'string';
    };
    processors: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            createdAt: '2022-11-17T08:48:45.048Z';
            identificationRequestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            type: 'PhotoIdentification';
            processor: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
                fullname: 'string';
            };
            processorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        }
    ];
    previousStates: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            createdAt: '2022-11-17T08:48:45.049Z';
            passportFrontSideImageUrl: 'string';
            passportBackSideImageUrl: 'string';
            selfieWithPassportImageUrl: 'string';
            pin: 'string';
            documentType: 'AN';
            documentNumber: 'string';
            address: {
                region: 'string';
                locality: 'string';
                street: 'string';
            };
        }
    ];
    requireEditNotes: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            createdAt: '2022-11-17T08:48:45.049Z';
            processor: {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
                fullname: 'string';
            };
            processorId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            editRequiredProperties: {
                additionalProp1: ['string'];
                additionalProp2: ['string'];
                additionalProp3: ['string'];
            };
            identificationRequestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        }
    ];
    videoIdentificationCallFiles: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            createdAt: '2022-11-17T08:48:45.049Z';
            url: 'string';
        }
    ];
}
export interface IPersonalData {
    pin: 'string';
    name: 'string';
    surname: 'string';
    patronymic: 'string';
    birthDate: '2022-11-17T10:16:48.706Z';
    gender: 'Female';
    maritalStatus: 0;
    passportType: 0;
    documentNumber: 'string';
    dateOfExpiry: '2022-11-17T10:16:48.706Z';
    authority: 'string';
    dateOfIssue: '2022-11-17T10:16:48.706Z';
    citizenship: 'string';
    residenceLocation: 0;
    residenceAddress: 'string';
    profilePhotoUrl: 'string';
}
