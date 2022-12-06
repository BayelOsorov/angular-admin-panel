export interface IDetailMalls {
    id: 0;
    name: 'string';
    address: 'string';
    description: 'string';
    order: 0;
    location: {
        coordinates: [];
        type: 'text';
    };
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
    isActive: true;
    type: 'Mall';
    locality: 0;
    logo: 'string';
}
export interface IListMalls {
    items: [IDetailMalls];
    pageCount: 0;
    totalItemCount: 0;
    page: 0;
    pageSize: 0;
    hasPreviousPage: true;
    hasNextPage: true;
}
