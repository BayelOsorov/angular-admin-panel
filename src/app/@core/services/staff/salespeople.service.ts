import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SalespeopleService {
    constructor(private http: HttpClient) {}
    getListSalespeople(page = 1, filter) {
        return this.http.get(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Search?userIds=${filter.userIds}&page=${page}&pageSize=20`
        );
    }
    getListInvitedAccounts(page = 1, filter) {
        return this.http.get(
            environment.baseUrlOidc +
                `/api/v1/referral-program/sellers/invited-accounts?inviterId=${filter.inviterId}&from=${filter.from}&to=${filter.to}&page=${page}&pageSize=20`
        );
    }

    deleteSalesperson(id: string) {
        return this.http.delete(
            environment.baseUrlOidc +
                `/api/v1/referral-program/sellers/delete?userId=${id}`
        );
    }

    createSalesperson(data) {
        return this.http.post(
            environment.baseUrlOidc + `/api/v1/referral-program/sellers/create`,
            data
        );
    }
}
