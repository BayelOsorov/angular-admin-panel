export interface IIdentificationDetail {
    id: string;
    createdAt: Date;
    phoneNumber: string;
    comments: any;
    photoIdentificationDeclinedAt: Date;
    photoIdentificationApprovedAt: Date;
    videoIdentificationApprovedAt: Date;
    videoIdentificationRequestedAt: Date;
    videoIdentificationDeclinedAt: Date;
    userId: string;
    status: string;
    passportFrontSideImageUrl: string;
    passportBackSideImageUrl: string;
    selfieWithPassportImageUrl: string;
    currentProcessor: {
        id: string;
        fullname: string;
    };
    pin: string;
    documentType: string;
    documentNumber: string;
    address: {
        region: string;
        locality: string;
        street: string;
    };
    processors: [
        {
            id: string;
            createdAt: Date;
            identificationRequestId: string;
            type: string;
            processor: {
                id: string;
                fullname: string;
            };
            processorId: string;
        }
    ];
    previousStates: [
        {
            id: string;
            createdAt: Date;
            passportFrontSideImageUrl: string;
            passportBackSideImageUrl: string;
            selfieWithPassportImageUrl: string;
            pin: string;
            documentType: string;
            documentNumber: string;
            address: {
                region: string;
                locality: string;
                street: string;
            };
        }
    ];
    requireEditNotes: [
        {
            id: string;
            createdAt: Date;
            processor: {
                id: string;
                fullname: string;
            };
            processorId: string;
            editRequiredProperties: {
                additionalProp1: [string];
                additionalProp2: [string];
                additionalProp3: [string];
            };
            identificationRequestId: string;
        }
    ];
    videoIdentificationCallFiles: [
        {
            id: string;
            createdAt: Date;
            url: string;
        }
    ];
}
export interface IPersonalData {
    pin: string;
    name: string;
    surname: string;
    patronymic: string;
    birthDate: Date;
    gender: string;
    maritalStatus: number;
    passportType: number;
    documentNumber: string;
    dateOfExpiry: Date;
    authority: string;
    dateOfIssue: Date;
    citizenship: string;
    residenceLocation: number;
    residenceAddress: string;
    profilePhotoUrl: string;
}
export interface IVideoIdentification {
    id: string;
    object: string;
    type: string;
    status: string;
    sessionId: string;
    createdAt: Date;
    activeAt: string;
    location: string;
    ip: string;
    platform: string;
    token: string;
    serverData: string;
    clientData: string;
    record: boolean;
    role: string;
    kurentoOptions: {
        videoMaxRecvBandwidth: number;
        videoMinRecvBandwidth: number;
        videoMaxSendBandwidth: number;
        videoMinSendBandwidth: number;
        allowedFilters: [string, string];
    };
    rtspUri: string;
    adaptativeBitrate: string;
    onlyPlayWithSubscribers: string;
    networkCache: string;
    publishers: string;
    subscribers: string;
}
