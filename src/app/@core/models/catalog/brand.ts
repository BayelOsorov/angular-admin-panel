export interface IListBrand {
    items: [IListBrand];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailBrand {
    id: 0;
    name: 'string';
    logo: 'string';
    order: 0;
    isActive: true;
    isDeleted: true;
    categoryId: 0;
}
