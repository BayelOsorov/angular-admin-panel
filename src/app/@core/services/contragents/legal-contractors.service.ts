import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IDetailLegalContractor } from '../../models/contragent/contragent';

@Injectable({
    providedIn: 'root',
})
export class LegalContractorsService {
    constructor(private http: HttpClient) {}

    getDetailLegalContractor(id: number) {
        return this.http.get<IDetailLegalContractor>(
            environment.contragentUrl + `/admin/api/v1/legal-contractors/${id}`
        );
    }

    deleteLegalContractor(id: number) {
        return this.http.delete(
            environment.contragentUrl + `/admin/api/v1/legal-contractors/${id}`
        );
    }
    editLegalContractor(id: number, data) {
        return this.http.put(
            environment.contragentUrl + `/admin/api/v1/legal-contractors/${id}`,
            data
        );
    }
    createLegalContractor(data) {
        return this.http.post(
            environment.contragentUrl + `/admin/api/v1/legal-contractors`,
            data
        );
    }
}
