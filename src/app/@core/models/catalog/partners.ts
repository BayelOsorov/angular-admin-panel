export interface IDetailPartner {
    id: 0;
    name: string;
    logo: string;
    isActive: true;
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
            id: 0;
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
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListPartnerImages {
    items: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            imagePath: string;
            title: string;
            sequence: 0;
        }
    ];
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListPartnerBranches {
    items: [IDetailPartnerBranch];
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}

export interface IDetailPartnerBranch {
    id: 0;
    name: string;
    address: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    phoneNumber: string;
    email: string;
    localityId: 0;
    mallId: 0;
    partnerId: 0;
    workingSchedule: [
        {
            day: string;
            workingHourStart: {
                hour: 0;
                minute: 0;
                second: 0;
                millisecond: 0;
                ticks: 0;
            };
            workingHourEnd: {
                hour: 0;
                minute: 0;
                second: 0;
                millisecond: 0;
                ticks: 0;
            };
            lunchHourStart: {
                hour: 0;
                minute: 0;
                second: 0;
                millisecond: 0;
                ticks: 0;
            };
            lunchHourEnd: {
                hour: 0;
                minute: 0;
                second: 0;
                millisecond: 0;
                ticks: 0;
            };
        }
    ];
}

export interface IListPartnerFeedbacks {
    items: [IPartnerFeedback];
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IPartnerFeedback {
    id: 0;
    comment: 'string';
    rate: 0;
    clientId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    partner: {
        id: 0;
        name: 'string';
    };
    createDateTime: '2022-11-25T05:19:58.091Z';
}
// export interface IPartnerDetailFeedback
