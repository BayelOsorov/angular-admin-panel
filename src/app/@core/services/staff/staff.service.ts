import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IDetailStaff, IListStaff, IStaffRole } from '../../models/staff/staff';

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
    editStaff(id: string, data) {
        return this.http.put(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Update/${id}`,
            data
        );
    }
    getRolesStaff() {
        return this.http.get<IStaffRole[]>(
            environment.baseUrlOidc + `/Administration/api/v1/Roles/List`
        );
    }
}
