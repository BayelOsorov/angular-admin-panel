import { HttpClient } from '@angular/common/http';
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
    getUserRelatedFiles(userId) {
        return this.http.get<IUserRelatedFiles>(
            environment.baseUrl +
                `/administration/api/v1/user-related-files/${userId}`
        );
    }
    getBlob(url) {
        return this.http.get(url, HttpOptions);
    }
}
