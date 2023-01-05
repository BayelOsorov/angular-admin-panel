import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IPartnerIdentificationDetail,
    IPartnerIdentificationList,
} from '../../../models/catalog/partners';

@Injectable({
    providedIn: 'root',
})
export class PartnerIdentificationService {
    constructor(private http: HttpClient) {}

    getListPartnerIdentification(page = 1, filter) {
        const { status, name, phone, categoryId } = filter;
        return this.http.get<IPartnerIdentificationList>(
            environment.baseUrl +
                `/Administration/api/v1/partner-applications?page=${page}&status=${status}&partnerCategoryId=${categoryId}&shopName=${name}&clientPhoneNumber=${phone}&orderBy=createdAt&orderType=desc&pageSize=20`
        );
    }
    getPartnerIdentificationDetail(id) {
        return this.http.get<IPartnerIdentificationDetail>(
            environment.baseUrl +
                `/Administration/api/v1/partner-applications/${id}`
        );
    }

    approvePartnerIdentification(id) {
        return this.http.patch(
            environment.baseUrl +
                `/Administration/api/v1/partner-applications/${id}/approve`,
            { comment: 'approve' }
        );
    }
    declinePartnerIdentification(id) {
        return this.http.patch(
            environment.baseUrl +
                `/Administration/api/v1/partner-applications/${id}/decline`,
            { comment: 'decline' }
        );
    }
    needToEditPartnerIdentification(id, data) {
        return this.http.post(
            environment.baseUrl +
                `/Administration/api/v1/partner-applications/${id}/need-to-edit`,
            data
        );
    }
}
