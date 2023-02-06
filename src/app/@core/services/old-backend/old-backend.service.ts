import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IListCategories } from '../../models/catalog/category';
import { IUserRelatedFiles } from '../../models/catalog/partners';
import { HttpOptions } from '../../utils';

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
    getListPartners(name = '') {
        return this.http.get(
            environment.baseUrl + `/api/v1/Partners/Search?name=${name}`
        );
    }
    getDetailPartner(id) {
        return this.http.get(
            environment.baseUrl + `/api/v1/Partners/Get/${id}`
        );
    }
    getUserRelatedFiles(userId) {
        return this.http.get<IUserRelatedFiles>(
            environment.baseUrl +
                `/administration/api/v1/user-related-files/${userId}`
        );
    }
    getBlob(url) {
        const headers = new HttpHeaders({
            'Content-Type': 'blob',
        });
        return this.http.get<Blob>(url, {
            headers,
        });
    }
}
