import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PartnerNewsService {
    constructor(private http: HttpClient) {}
    getListPartnerNews(page = 1) {
        return this.http.get(
            environment.partnerNewsUrl +
                `/notifications?page=${page}&pageSize=20`
        );
    }
    getDetailPartnerNews(id: number) {
        return this.http.get(
            environment.partnerNewsUrl + `/admin/notifications/${id}`
        );
    }
    deletePartnerNews(id: number) {
        return this.http.delete(
            environment.partnerNewsUrl + `/admin/notifications/${id}`
        );
    }
    editPartnerNews(id: number, data) {
        return this.http.patch(
            environment.partnerNewsUrl + `/admin/notifications/${id}`,
            data
        );
    }
    createPartnerNews(data) {
        return this.http.post(
            environment.partnerNewsUrl + `/admin/notifications`,
            data
        );
    }
}
