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
