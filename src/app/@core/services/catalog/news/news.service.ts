import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IDetailNews, IListNews } from '../../../models/catalog/catalog';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private http: HttpClient) {}
    getListNews(page = 1, name = '') {
        return this.http.get<IListNews>(
            environment.catalogUrl +
                `/Administration/api/v1/news?page=${page}&pageSize=20`
        );
    }
    getDetailNews(id: number) {
        return this.http.get<IDetailNews>(
            environment.catalogUrl + `/Administration/api/v1/news/${id}`
        );
    }
    deleteNews(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/news/${id}`
        );
    }
    editNews(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/news/${id}`,
            data
        );
    }
    createNews(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/news`,
            data
        );
    }
}
