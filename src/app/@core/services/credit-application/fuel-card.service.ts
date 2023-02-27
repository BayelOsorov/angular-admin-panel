import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    ICreditApplicationDetail,
    ICreditApplicationList,
    IScoringCreditApplication,
} from '../../models/credit-application/credit-application';

@Injectable({
    providedIn: 'root',
})
export class FuelCardApplicationService {
    constructor(private http: HttpClient) {}

    getFuelCardApplication() {
        return this.http.get<ICreditApplicationDetail>(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/next-ocl-request`
        );
    }

    getFuelCardApplicationDetail() {
        return this.http.get<ICreditApplicationDetail>(
            environment.fuelCardUrl + `/operator/api/v1/ocl-requests/in-process`
        );
    }
    getListFuelCardApplication(page, filter) {
        return this.http.get<ICreditApplicationList>(
            environment.fuelCardUrl +
                `/admin/api/v1/ocl-requests/search?pageNumber=${page}&from=${filter.from}&to=${filter.to}&status=${filter.status}&pageSize=20`
        );
    }
    getListFuelCardApplicationByCustomerId(page, customerId) {
        return this.http.get<ICreditApplicationList>(
            environment.fuelCardUrl +
                `/admin/api/v1/ocl-requests/search?pageNumber=${page}&customerId=${customerId}&pageSize=20`
        );
    }
    getFuelCardApplicationDetailAdmin(id) {
        return this.http.get<ICreditApplicationDetail>(
            environment.fuelCardUrl + `/admin/api/v1/ocl-requests/${id}/details`
        );
    }
    approveFuelCardApplication(id, data) {
        return this.http.patch(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/approve`,
            data
        );
    }
    resetDeclinedFuelCardApplication(id) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/customers/${id}/update-ocl-creation-lockout-end`,
            { lockoutEnd: null }
        );
    }
    declineFuelCardApplication(id, data) {
        return this.http.patch(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/decline`,
            data
        );
    }
    needToEditFuelCardApplication(id, data) {
        return this.http.patch(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/require-edit`,
            data
        );
    }
    sendCommentFuelCardApplication(id, data) {
        return this.http.post(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/comments`,
            data
        );
    }
    getFuelCardApplicationScoring(id) {
        return this.http.get<IScoringCreditApplication>(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/scoring`
        );
    }

    getFuelCardSpecialistAccount() {
        return this.http.get(
            environment.fuelCardUrl + `/operator/api/v1/account`
        );
    }
    createFuelCardSpecialistAccount() {
        return this.http.post(
            environment.fuelCardUrl + `/operator/api/v1/account`,
            { comment: 'create' }
        );
    }
    closeFuelCardCreditLine(id) {
        return this.http.post(
            environment.fuelCardUrl + `/admin/api/v1/credit-lines/${id}/close`,
            { comment: 'close' }
        );
    }
    getFuelCardCreditLineStatus(id) {
        return this.http.get(
            environment.fuelCardUrl + `/admin/api/v1/debtors/${id}`
        );
    }
}
