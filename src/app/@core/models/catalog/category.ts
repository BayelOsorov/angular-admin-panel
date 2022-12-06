export interface IListCategories {
    items: [IDetailCategory];
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailCategory {
    id: 0;
    name: 'string';
    logo: 'string';
    order: 0;
    isActive: true;
    isDeleted: true;
    workFromDate: '2022-10-18T10:31:58.017Z';
    parentId: 0;
    backgroundColor: 'string';
}
