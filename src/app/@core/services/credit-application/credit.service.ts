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
export class ApplicationRequestsService {
    constructor(private http: HttpClient) {}

    getSocialFund(pin) {
        return this.http.get(
            environment.socialFundUrl +
                `/Administration/api/v1/deductions/${pin}`
        );
    }

    getBlackListPerson(fullname) {
        return this.http.get(
            environment.blackListPersonUrl +
                `/Administration/api/v1/blacklist/search?fullname=${fullname}`
        );
    }
    getTaxInspectionBisinessActivity(pin) {
        return this.http.get(
            environment.taxInspectionUrl +
                `/Administration/api/v1/tax-inspection/business-activity-data?pin=${pin}`
        );
    }
    getTaxInspectionTaxPayer(pin) {
        return this.http.get(
            environment.taxInspectionUrl +
                `/Administration/api/v1/tax-inspection/tax-payer-data?pin=${pin}`
        );
    }
    getTaxInspectionSocialFundBalance(pin) {
        return this.http.get(
            environment.taxInspectionUrl +
                `/Administration/api/v1/tax-inspection/social-fund-balance?pin=${pin}`
        );
    }
}
