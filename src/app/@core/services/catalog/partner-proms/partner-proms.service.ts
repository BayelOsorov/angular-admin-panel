import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IDetailPartnerProms,
    IListPartnerProms,
} from '../../../models/catalog/catalog';

@Injectable({
    providedIn: 'root',
})
export class PartnerPromsService {
    constructor(private http: HttpClient) {}
    getListPartnerProms(page = 1, name = '') {
        return this.http.get<IListPartnerProms>(
            environment.catalogUrl +
                `/Administration/api/v1/partner-proms?name=${name}&page=${page}&pageSize=20`
        );
    }
    getDetailPartnerProms(id: number) {
        return this.http.get<IDetailPartnerProms>(
            environment.catalogUrl +
                `/Administration/api/v1/partner-proms/${id}`
        );
    }
    deletePartnerProms(id: number) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/partner-proms?promoId=${id}`
        );
    }
    editPartnerProms(id: number, data) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/partner-proms?promoId=${id}`,
            data
        );
    }
    createPartnerProms(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/partner-proms`,
            data
        );
    }
}
