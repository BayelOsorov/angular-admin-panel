import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IDetailProduct, IListProducts } from '../../../models/catalog/catalog';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}
    getListProducts(page = 1, name = '') {
        return this.http.get<IListProducts>(
            environment.catalogUrl +
                `/Administration/api/v1/products?page=${page}&name=${name}&pageSize=20`
        );
    }
    getDetailProduct(id: number) {
        return this.http.get<IDetailProduct>(
            environment.catalogUrl + `/Administration/api/v1/products/${id}`
        );
    }
    deleteProduct(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/products/${id}`
        );
    }
    editProduct(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/products/${id}`,
            data
        );
    }
    createProduct(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/products`,
            data
        );
    }
}
