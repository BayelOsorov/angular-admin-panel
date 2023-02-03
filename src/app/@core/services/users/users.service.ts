import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}
    getListUsers(page = 1, filter) {
        return this.http.get(
            environment.baseUrl +
                `/administration/api/v2/users?identificationLevels=${filter.status}&name=${filter.name}&surname=${filter.surname}&patronymic=${filter.patronymic}&phoneNumber=${filter.phone}&orderBy=Id DESC&pageNumber=${page}&pageSize=20`
        );
    }
    getDetailUser(id: number) {
        return this.http.get(
            environment.baseUrl + `/administration/api/v2/users/${id}`
        );
    }
}
