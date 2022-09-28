import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IDetailStaff, IListStaff } from '../../models/staff/staff';

@Injectable({
    providedIn: 'root',
})
export class StaffService {
    constructor(private http: HttpClient) {}
    getListStaff(page = 1) {
        return this.http.get<IListStaff>(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Search?&pageNumber=${page}&pageSize=20`
        );
    }
    getDetailStaff(id: string) {
        return this.http.get<IDetailStaff>(
            environment.baseUrlOidc + `/Administration/api/v1/Users/Get/${id}`
        );
    }
    deleteStaff(id: string) {
        return this.http.delete(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Delete/${id}`
        );
    }
}
