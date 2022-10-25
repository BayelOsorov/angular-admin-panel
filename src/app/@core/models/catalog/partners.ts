export interface IDetailPartner {
    id: 0;
    name: 'string';
    logo: 'string';
    isActive: true;
    description: {
        additionalProp1: 'string';
        additionalProp2: 'string';
        additionalProp3: 'string';
    };
    categoryId: 0;
    productId: 0;
    brandId: 0;
    tags: [
        {
            id: 0;
            name: {
                additionalProp1: 'string';
                additionalProp2: 'string';
                additionalProp3: 'string';
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
