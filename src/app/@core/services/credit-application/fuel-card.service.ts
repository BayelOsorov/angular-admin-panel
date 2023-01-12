import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    ICreditApplicationDetail,
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

    approveFuelCardApplication(id, data) {
        return this.http.patch(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/approve`,
            data
        );
    }
    declineFuelCardApplication(id) {
        return this.http.patch(
            environment.fuelCardUrl +
                `/operator/api/v1/ocl-requests/${id}/decline`,
            { comment: 'decline' }
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
}
