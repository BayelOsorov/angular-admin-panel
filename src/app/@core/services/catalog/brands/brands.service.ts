import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { IDetailBrand, IListBrand } from '../../../models/catalog/brand';
import { blobToBase64, toBase64 } from '../../../utils/toBase64';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    constructor(private http: HttpClient) {}

    getListBrand(page = 1, name = '') {
        return this.http.get<IListBrand>(
            environment.catalogUrl +
                `/Administration/api/v1/brands/search?page=${page}&name=${name}&pageSize=20`
        );
    }
    getDetailBrand(id: number) {
        return this.http.get<IDetailBrand>(
            environment.catalogUrl + `/Administration/api/v1/brands/${id}`
        );
    }
    getBrandLogoImg(id: number, imgId) {
        const httpOptions: object = {
            responseType: 'blob',
        };
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/brands/${id}/logo/${imgId}`,
            httpOptions
        );
    }
    deleteBrand(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/brands/${id}`
        );
    }
    editBrand(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/brands/${id}`,
            data
        );
    }
    createBrand(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/brands`,
            data
        );
    }
}
