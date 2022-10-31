import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IDetailCategory,
    IListCategories,
} from '../../../models/catalog/category';
import { HttpOptions } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    constructor(private http: HttpClient) {}
    getListCategories(page = 1, name = '') {
        return this.http.get<IListCategories>(
            environment.catalogUrl +
                `/Administration/api/v1/categories/search?page=${page}&name=${name}&pageSize=20`
        );
    }
    getDetailCategory(id: number) {
        return this.http.get<IDetailCategory>(
            environment.catalogUrl + `/Administration/api/v1/categories/${id}`
        );
    }
    deleteCategory(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/categories/${id}`
        );
    }
    editCategory(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/categories/${id}`,
            data
        );
    }
    createCategory(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/categories`,
            data
        );
    }
    getCategoryLogoImg(id: number, imgId) {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/categories/${id}/logo/${imgId}`,
            HttpOptions
        );
    }
}
