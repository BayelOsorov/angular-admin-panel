export interface IStaff {
    items: [
        {
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
            roles: [
                {
                    id: 'string';
                    name: 'string';
                    normalizedName: 'string';
                    concurrencyStamp: 'string';
                    title: 'string';
                }
            ];
        }
    ];
    pageCount: 0;
    totalItemCount: 0;
    pageNumber: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
