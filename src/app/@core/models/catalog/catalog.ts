export interface IListTags {
    items: [
        {
            id: 0;
            name: {
                additionalProp1: 'string';
                additionalProp2: 'string';
                additionalProp3: 'string';
            };
        }
    ];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListProducts {
    items: [
        {
            id: 0;
            name: 'string';
            isActive: true;
        }
    ];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailProduct {
    id: 0;
    name: 'string';
    isActive: true;
}
export interface IDetailLocality {
    id: 0;
    name: {
        ru: 'string';
        kg: 'string';
        uz: 'string';
    };
    isActive: true;
}
export interface IListLocalities {
    items: [IDetailLocality];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IListNews {
    items: [IDetailNews];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailNews {
    id: 0;
    cover: 'string';
    isActive: true;
    title: {
        ru: 'string';
        kg: 'string';
        uz: 'string';
    };
    shortText: {
        ru: 'string';
        kg: 'string';
        uz: 'string';
    };
    text: {
        ru: 'string';
        kg: 'string';
        uz: 'string';
    };
    createDateTime: '2022-11-08T08:12:27.994Z';
    productId: 0;
}
export interface IListPartnerProms {
    items: [IDetailPartnerProms];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailPartnerProms {
    id: 0;
    partnerId: 0;
    cover: 'string';
    title: 'string';
    hmtlBody: 'string';
    startDateTime: '2022-11-11T04:14:44.261Z';
    endDateTime: '2022-11-11T04:14:44.261Z';
}
export interface IDetailTag {
    id: 0;
    name: {
        ru: 'string';
        kg: 'string';
        uz: 'string';
    };
}
