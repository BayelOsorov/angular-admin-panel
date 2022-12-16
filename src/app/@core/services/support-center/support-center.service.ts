import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    IDetailSupportCenterAnswer,
    IDetailSupportCenterCategoriesAndProducts,
    IListSupportCenterAnswers,
    IListSupportCenterCategoriesAndProducts,
} from '../../models/support-center/support-center';

@Injectable({
    providedIn: 'root',
})
export class SupportCenterService {
    constructor(private http: HttpClient) {}
    getListSupportCenterAnswers(page = 1, filter) {
        const { categoryId = '', productId = '', text = '' } = filter;
        return this.http.get<IListSupportCenterAnswers>(
            environment.supportCenterUrl +
                `/Administration/api/v1/answers?categoryId=${categoryId}&productId=${productId}&queryText=${text}&page=${page}&pageSize=20`
        );
    }
    getDetailSupportCenterAnswer(id: number) {
        return this.http.get<IDetailSupportCenterAnswer>(
            environment.supportCenterUrl +
                `/Administration/api/v1/answers/${id}`
        );
    }
    deleteSupportCenterAnswer(answerId: number) {
        return this.http.delete(
            environment.supportCenterUrl +
                `/Administration/api/v1/answers/${answerId}`
        );
    }
    createSupportCenterAnswer(data) {
        return this.http.post(
            environment.supportCenterUrl + `/Administration/api/v1/answers`,
            data
        );
    }
    updateSupportCenterAnswer(answerId, data) {
        return this.http.put(
            environment.supportCenterUrl +
                `/Administration/api/v1/answers/${answerId}`,
            data
        );
    }
    // ! Categories
    getListSupportCenterCategories(page = 1) {
        return this.http.get<IListSupportCenterCategoriesAndProducts>(
            environment.supportCenterUrl +
                `/Administration/api/v1/categories?page=${page}&pageSize=20`
        );
    }
    getDetailSupportCenterCategory(id: number) {
        return this.http.get<IDetailSupportCenterCategoriesAndProducts>(
            environment.supportCenterUrl +
                `/Administration/api/v1/categories/${id}`
        );
    }
    deleteSupportCenterCategory(id: number) {
        return this.http.delete(
            environment.supportCenterUrl +
                `/Administration/api/v1/categories/${id}`
        );
    }
    editSupportCenterCategory(id: number, data) {
        return this.http.put(
            environment.supportCenterUrl +
                `/Administration/api/v1/categories/${id}`,
            data
        );
    }
    createSupportCenterCategory(data) {
        return this.http.post(
            environment.supportCenterUrl + `/Administration/api/v1/categories`,
            data
        );
    }
    // ! Products
    getListSupportCenterProducts(page = 1) {
        return this.http.get<IListSupportCenterCategoriesAndProducts>(
            environment.supportCenterUrl +
                `/Administration/api/v1/products?page=${page}&pageSize=20`
        );
    }
    getDetailSupportCenterProduct(id: number) {
        return this.http.get<IDetailSupportCenterCategoriesAndProducts>(
            environment.supportCenterUrl +
                `/Administration/api/v1/products/${id}`
        );
    }
    deleteSupportCenterProduct(id: number) {
        return this.http.delete(
            environment.supportCenterUrl +
                `/Administration/api/v1/products/${id}`
        );
    }
    editSupportCenterProduct(id: number, data) {
        return this.http.put(
            environment.supportCenterUrl +
                `/Administration/api/v1/products/${id}`,
            data
        );
    }
    createSupportCenterProduct(data) {
        return this.http.post(
            environment.supportCenterUrl + `/Administration/api/v1/products`,
            data
        );
    }
}
