export interface IListSupportCenterAnswers {
    page: number;
    pageCount: number;
    pageSize: number;
    totalItemCount: number;
    items: [IDetailSupportCenterAnswer];
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailSupportCenterAnswer {
    id: number;
    title: {
        ru: string;
        kg: string;
        uz: string;
    };
    body: {
        ru: string;
        kg: string;
        uz: string;
    };
    order: number;
    categoryId: number;
    productId: number;
}
export interface IListSupportCenterCategoriesAndProducts {
    page: number;
    pageCount: number;
    pageSize: number;
    totalItemCount: number;
    items: [IDetailSupportCenterCategoriesAndProducts];
    hasPreviousPage: true;
    hasNextPage: true;
}
export interface IDetailSupportCenterCategoriesAndProducts {
    id: number;
    title: {
        ru: string;
        kg: string;
        uz: string;
    };
    body: {
        ru: string;
        kg: string;
        uz: string;
    };
    order: number;
    categoryId: number;
    productId: number;
}
