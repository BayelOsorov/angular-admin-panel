import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IStaff } from '../../models/staff/staff';

@Injectable({
    providedIn: 'root',
})
export class StaffService {
    constructor(private http: HttpClient) {}
    getListStaff(page = 1) {
        return this.http.get<IStaff>(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Search?&pageNumber=${page}&pageSize=20`
        );
    }
    deleteStaff(id: string) {
        return this.http.delete<IStaff>(
            environment.baseUrlOidc +
                `/Administration/api/v1/Users/Delete/${id}`
        );
    }
}
