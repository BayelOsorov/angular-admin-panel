import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IDetailMalls, IListMalls } from '../../../models/catalog/malls';

@Injectable({
    providedIn: 'root',
})
export class MallsService {
    constructor(private http: HttpClient) {}
    getListMalls(page = 1, filter) {
        const { localityId = '', type = '', name = '' } = filter;
        return this.http.get<IListMalls>(
            environment.catalogUrl +
                `/Administration/api/v1/malls/search?page=${page}&type=${type}&localityId=${
                    localityId ? localityId : ''
                }&name=${name}&pageSize=20`
        );
    }
    getDetailMall(id: number) {
        return this.http.get<IDetailMalls>(
            environment.catalogUrl + `/Administration/api/v1/malls/${id}`
        );
    }
    deleteMall(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/malls/${id}`
        );
    }
    editMall(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/malls/${id}`,
            data
        );
    }
    createMall(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/malls`,
            data
        );
    }
}
