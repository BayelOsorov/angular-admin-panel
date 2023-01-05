import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IListCategories } from '../../models/catalog/category';

@Injectable({
    providedIn: 'root',
})
export class OldBackendService {
    constructor(private http: HttpClient) {}
    getListCategories(name = '') {
        return this.http.get<IListCategories>(
            environment.baseUrl +
                `/api/v1/PartnerCategories/Search?name=${name}`
        );
    }
}
