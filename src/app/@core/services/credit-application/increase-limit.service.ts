import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    ICreditApplicationDetail,
    ICreditApplicationList,
    IScoringCreditApplication,
} from '../../models/credit-application/credit-application';
import { HttpOptions } from '../../utils';

@Injectable({
    providedIn: 'root',
})
export class IncreaseLimitApplicationService {
    constructor(private http: HttpClient) {}

    getCreditApplication() {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/next-ucl-request`
        );
    }
    getListCreditApplication(page, filter) {
        return this.http.get<ICreditApplicationList>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ucl-requests/search?pageNumber=${page}&from=${filter.from}&to=${filter.to}&status=${filter.status}&pageSize=20`
        );
        // return this.http.get<ICreditApplicationList>(
        //     environment.creditApplicationUrl +
        //         `/admin/api/v1/ucl-requests/search?pageNumber=${page}&name=${filter.name}&surname=${filter.surname}&patronymic=${filter.patronymic}&phoneNumber=${filter.phoneNumber}&from=${filter.from}&to=${filter.to}&status=${filter.status}&pageSize=20`
        // );
    }
    getListCreditApplicationByCustomerId(page, customerId) {
        return this.http.get<ICreditApplicationList>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ucl-requests/search?pageNumber=${page}&customerId=${customerId}&pageSize=20`
        );
    }
    getCreditApplicationDetailAdmin(id) {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ucl-requests/${id}/details`
        );
    }
    getCreditApplicationDetail() {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/in-process`
        );
    }

    approveCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/${id}/approve`,
            data
        );
    }
    declineCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/${id}/decline`,
            data
        );
    }
    needToEditCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/${id}/require-edit`,
            data
        );
    }
    sendCommentCreditApplication(id, data) {
        return this.http.post(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/${id}/comments`,
            data
        );
    }
    getCreditApplicationScoring(id) {
        return this.http.get<IScoringCreditApplication>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ucl-requests/${id}/scoring`
        );
    }
    getCreditApplicationBureauInfoReport(id) {
        return this.http.get(
            environment.creditApplicationUrl +
                `/operator/api/v1/credit-bureau-information-reports/${id}`,
            HttpOptions
        );
    }
    getCreditSpecialistAccount() {
        return this.http.get(
            environment.creditApplicationUrl + `/operator/api/v1/account`
        );
    }
    resetDeclinedCreditApplication(id) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/customers/${id}/update-ucl-creation-lockout-end`,
            { lockoutEnd: null }
        );
    }
    createCreditSpecialistAccount() {
        return this.http.post(
            environment.creditApplicationUrl + `/operator/api/v1/account`,
            { comment: 'create' }
        );
    }
}
