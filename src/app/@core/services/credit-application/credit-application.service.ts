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
export class CreditApplicationService {
    constructor(private http: HttpClient) {}

    getCreditApplication() {
        return this.http.get<ICreditApplicationDetail>(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/next-ocl-request`
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
    declineCreditApplication(id) {
        return this.http.patch(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/decline`,
            { comment: 'decline' }
        );
    }
    needToEditCreditApplication(id, data) {
        return this.http.post(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/require-edit`,
            data
        );
    }
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
    getCreditApplicationKib(id) {
        return this.http.get(
            environment.creditApplicationUrl +
                `/operator/api/v1/ocl-requests/${id}/debtor-information-report`
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
}
