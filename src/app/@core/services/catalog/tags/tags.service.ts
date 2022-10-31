import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IListTags } from '../../../models/catalog/catalog';

@Injectable({
    providedIn: 'root',
})
export class TagsService {
    constructor(private http: HttpClient) {}
    getListTags(page = 1, name = '') {
        return this.http.get<IListTags>(
            environment.catalogUrl +
                `/Administration/api/v1/tags/search?page=${page}&name=${name}&pageSize=20`
        );
    }
    getDetailTag(id: number) {
        return this.http.get(
            environment.catalogUrl + `/Administration/api/v1/tags/${id}`
        );
    }
    deleteTag(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/tags/${id}`
        );
    }
    editTag(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/tags/${id}`,
            data
        );
    }
    createTag(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/tags`,
            data
        );
    }
}
