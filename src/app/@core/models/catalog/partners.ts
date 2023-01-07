import { Url } from 'url';

export interface IDetailPartner {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
    description: {
        kg: string;
        ru: string;
        uz: string;
    };
    shortDescription: {
        kg: string;
        ru: string;
        uz: string;
    };
    categories: [{ id: number; name: string }];
    products: [{ id: number; name: string }];
    brands: [{ id: number; name: string }];
    tags: [
        {
            id: number;
            name: {
                kg: string;
                ru: string;
                uz: string;
            };
        }
    ];
    gallery: [string];
}
export interface IListPartner {
    items: [IDetailPartner];
    pageCount: number;
    totalItemCount: number;
    page: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface IListPartnerImages {
    items: [
        {
            id: string;
            imagePath: string;
            title: string;
            sequence: number;
        }
    ];
    pageCount: number;
    totalItemCount: number;
    page: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface IListPartnerBranches {
    items: [IDetailPartnerBranch];
    pageCount: number;
    totalItemCount: number;
    page: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface IDetailPartnerBranch {
    id: number;
    name: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    phoneNumber: string;
    email: string;
    localityId: number;
    mallId: number;
    partnerId: number;
    workingSchedule: [
        {
            day: string;
            workingHourStart: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
            workingHourEnd: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
            lunchHourStart: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
            lunchHourEnd: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
        }
    ];
}

export interface IListPartnerFeedbacks {
    items: [IPartnerFeedback];
    pageCount: number;
    totalItemCount: number;
    page: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface IPartnerFeedback {
    id: number;
    comment: string;
    rate: number;
    clientId: string;
    partner: {
        id: number;
        name: string;
    };
    createDateTime: Date;
}
export interface IPartnerIdentificationDetail {
    id: number;
    clientId: string;
    clientPhoneNumber: string;
    shopName: string;
    ownershipType: number;
    inn: string;
    registeredAddress: string;
    currentAddress: string;
    managerPosition: string;
    managerFullname: string;
    description: string;
    partnerCategoryId: number;
    partnerCategoryName: string;
    ownerPhoneNumber: string;
    businessPhoneNumber: string;
    requisiteType: number;
    requisite: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
    };
    documentFrontPhoto: string;
    documentInnerPhoto: string;
    bankName: string;
    bic: string;
    bankAccount: string;
    saleManagerFullName: string;
    okpo: string;
    image1: string;
    image2: string;
    companyLogo: string;
    site: string;
    instagram: string;
    facebook: string;
    email: string;
    comment: string;
    isPublicOfferRead: boolean;
    createdAt: Date;
    status: number;
    branches: [
        {
            id: number;
            name: string;
            localityId: string;
            localityName: {
                id: number;
                localizations: [
                    {
                        id: number;
                        cultureCode: string;
                        value: string;
                    }
                ];
            };
            mallName: string;
            mallId: number;
            address: string;
            workingHourStart: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
            workingHourEnd: {
                hour: number;
                minute: number;
                second: number;
                millisecond: number;
                ticks: number;
            };
            location: {
                type: string;
                coordinates: [number];
            };
        }
    ];
}
export interface IPartnerIdentificationList {
    items: [IPartnerIdentificationDetail];
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface IUserRelatedFiles {
    passport0ImageUrl: Url;
    passport1ImageUrl: Url;
    passport3ImageUrl: Url;
    profilePhotoUrl: Url;
    videoIdentificationFilesUrls: [Url];
}
