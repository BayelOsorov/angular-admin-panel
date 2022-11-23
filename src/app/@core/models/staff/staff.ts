export interface IListStaff {
    items: [IDetailStaff];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailStaff {
    id: 'string';
    name: 'string';
    userName: 'string';
    email: 'string';
    emailConfirmed: true;
    phoneNumber: 'string';
    phoneNumberConfirmed: true;
    twoFactorEnabled: true;
    lockoutEnd: '2022-09-27T04:55:21.053Z';
    accessFailedCount: 0;
    roles: IStaffRole[];
}
export interface IStaffRole {
    id: 'string';
    name: 'string';
    normalizedName: 'string';
    concurrencyStamp: 'string';
    title: 'string';
}
