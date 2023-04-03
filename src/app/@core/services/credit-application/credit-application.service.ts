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
export class CreditApplicationService {
    constructor(private http: HttpClient) {}

    getCreditApplication() {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/next-ocl-request`
        );
    }
    getListCreditApplication(page, filter) {
        return this.http.get<ICreditApplicationList>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ocl-requests/search?pageNumber=${page}&from=${filter.from}&to=${filter.to}&status=${filter.status}&pageSize=20`
        );
    }
    getListCreditApplicationByCustomerId(page, customerId) {
        return this.http.get<ICreditApplicationList>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ocl-requests/search?pageNumber=${page}&customerId=${customerId}&pageSize=20`
        );
    }
    getListOclObservation(page, filter) {
        return this.http.get(
            environment.creditApplicationUrl +
                `/admin/api/v1/ocl-requests/ocl-process-observation/in-process?pageNumber=${page}&minutes=${filter.minutes}&dateTime=${filter.dateTime}&pageSize=20`
        );
    }
    getListNoneOclObservation(page, filter) {
        return this.http.get(
            environment.creditApplicationUrl +
                `/admin/api/v1/ocl-requests/ocl-process-observation/dont-have-ocl?pageNumber=${page}&minutes=${filter.minutes}&dateTime=${filter.dateTime}&pageSize=20`
        );
    }
    getCreditApplicationDetailAdmin(id) {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/admin/api/v1/ocl-requests/${id}/details`
        );
    }
    getCreditApplicationDetail() {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/in-process`
        );
    }

    approveCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/approve`,
            data
        );
    }
    declineCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/decline`,
            data
        );
    }
    needToEditCreditApplication(id, data) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/require-edit`,
            data
        );
    }
    resetDeclinedCreditApplication(id) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/customers/${id}/update-ocl-creation-lockout-end`,
            { lockoutEnd: null }
        );
    }
    getPostponeCreditApplicationDetail(id) {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/postponed-in-process`
        );
    }
    postponeCreditApplication(id) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/postpone`,
            { data: '' }
        );
    }
    closeCustomerCreditLine(id) {
        return this.http.post(
            environment.creditApplicationUrl +
                `/admin/api/v1/credit-lines/${id}/close`,
            { data: '' }
        );
    }
    getCustomerCreditLineStatus(id) {
        return this.http.get(
            environment.creditApplicationUrl + `/admin/api/v1/customers/${id}`
        );
    }
    // closeCustomerCreditLine(id) {
    //     return this.http.get(
    //         environment.closeCreditLineUrl +
    //             `/api/v1/administration/Account/CloseCreditLine/${id}`
    //     );
    // }
    // getCustomerCreditLineStatus(id) {
    //     return this.http.get(
    //         environment.closeCreditLineUrl +
    //             `/api/v1/administration/Account/CreditLine/${id}`
    //     );
    // }
    sendCommentCreditApplication(id, data) {
        return this.http.post(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/comments`,
            data
        );
    }
    getCreditApplicationScoring(id) {
        return this.http.get<IScoringCreditApplication>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/scoring`
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
    createCreditSpecialistAccount() {
        return this.http.post(
            environment.creditApplicationUrl + `/operator/api/v1/account`,
            { comment: 'create' }
        );
    }
    sendReportComment(id, data) {
        return this.http.post(
            environment.creditApplicationUrl +
                `/operator/api/v1/customers/${id}/observation-comments`,
            data
        );
    }
}
