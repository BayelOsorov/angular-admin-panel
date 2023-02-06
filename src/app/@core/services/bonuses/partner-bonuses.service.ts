import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpOptions } from '../../utils';

@Injectable({
    providedIn: 'root',
})
export class PartnerBonusesService {
    constructor(private http: HttpClient) {}
    getListContractors(page = 1) {
        return this.http.get(
            environment.partnerBonusesUrl +
                `/admin/api/v1/contractors?pageNumber=${page}&pageSize=20`
        );
    }
    getDetailContractor(id: number) {
        return this.http.get(
            environment.partnerBonusesUrl + `/admin/api/v1/contractors/${id}`
        );
    }
    deleteContractor(id) {
        return this.http.delete(
            environment.partnerBonusesUrl + `/admin/api/v1/contractors/${id}`
        );
    }
    createContractor(data) {
        return this.http.post(
            environment.partnerBonusesUrl + `/admin/api/v1/contractors`,
            data
        );
    }
    getListContractorsPercentages(page, id) {
        return this.http.get(
            environment.partnerBonusesUrl +
                `/admin/api/v1/contractors/${id}/percentages?pageNumber=${page}&pageSize=20`
        );
    }
    createContractorPercentage(id, data) {
        return this.http.post(
            environment.partnerBonusesUrl +
                `/admin/api/v1/contractors/${id}/percentages`,
            data
        );
    }
    deleteContractorPercentages(id: number, percentageId) {
        return this.http.delete(
            environment.partnerBonusesUrl +
                `/admin/api/v1/contractors/${id}/percentages/${percentageId}`
        );
    }
}
