import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IDetailLocality,
    IListLocalities,
} from '../../../models/catalog/catalog';

@Injectable({
    providedIn: 'root',
})
export class LocalitiesService {
    constructor(private http: HttpClient) {}
    getListLocalities(page = 1, name = '') {
        return this.http.get<IListLocalities>(
            environment.catalogUrl +
                `/Administration/api/v1/localities/search?page=${page}&name=${name}&pageSize=20`
        );
    }
    getDetailLocality(id: number) {
        return this.http.get<IDetailLocality>(
            environment.catalogUrl + `/Administration/api/v1/localities/${id}`
        );
    }
    deleteLocality(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/localities/${id}`
        );
    }
    editLocality(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/localities/${id}`,
            data
        );
    }
    createLocality(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/localities`,
            data
        );
    }
}
