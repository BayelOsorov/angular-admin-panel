import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

    getDetailUser(id) {
        return this.http.get(
            environment.customerDataUrl + `/admin/api/v1/customers/${id}`
        );
    }
    getListUsers(page, filter) {
        return this.http.get(
            environment.customerDataUrl +
                `/admin/api/v1/customers/?identificationLevel=${filter.status}&name=${filter.name}&surname=${filter.surname}&patronymic=${filter.patronymic}&phoneNumber=${filter.phone}&orderBy=Id DESC&pageNumber=${page}&pageSize=20`
        );
    }
}
