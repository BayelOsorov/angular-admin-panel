export interface IDetailPartner {
    id: 0;
    name: 'string';
    logo: 'string';
    isActive: true;
    description: {
        kg: 'string';
        ru: 'string';
        uz: 'string';
    };
    shortDescription: {
        kg: 'string';
        ru: 'string';
        uz: 'string';
    };
    categoryId: 0;
    productId: 0;
    brandId: 0;
    tags: [
        {
            id: 0;
            name: {
                kg: 'string';
                ru: 'string';
                uz: 'string';
            };
        }
    ];
    gallery: ['string'];
}
export interface IListPartner {
    items: [IDetailPartner];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListPartnerImages {
    items: [
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
            imagePath: 'string';
            title: 'string';
            sequence: 0;
        }
    ];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListPartnerBranches {
    items: [IDetailPartnerBranch];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}

export interface IDetailPartnerBranch {
    id: 0;
    name: 'string';
    address: 'string';
    location: {
        type: 'string';
        coordinates: [number, number];
    };
    phoneNumber: 'string';
    email: 'string';
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