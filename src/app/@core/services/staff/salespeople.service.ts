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
            environment.salespeopleUrl +
                `/api/v1/referral-program/sellers/sellers?userIds=${filter.userIds}&page=${page}&pageSize=20`
        );
    }
    getListInvitedAccounts(page = 1, filter) {
        return this.http.get(
            environment.salespeopleUrl +
                `/api/v1/referral-program/sellers/invited-accounts?inviterId=${filter.inviterId}&from=${filter.from}&to=${filter.to}&page=${page}&pageSize=20`
        );
    }

    deleteSalesperson(id: string) {
        return this.http.delete(
            environment.salespeopleUrl +
                `/api/v1/referral-program/sellers/delete?userId=${id}`
        );
    }
    getUserByPhoneNumber(phone) {
        return this.http.get(
            environment.customersUrl +
                `/admin/api/v1/users/List?phoneNumber=${phone}&isIdentified=true&page=1&pageSize=20`
        );
    }
    createSalesperson(data) {
        return this.http.post(
            environment.salespeopleUrl +
                `/api/v1/referral-program/sellers/create`,
            data
        );
    }
}
