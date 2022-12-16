import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    IDetailLegalContractor,
    IDetailLegalContractorBeneficiary,
    IDetailLegalContractorEmployee,
} from '../../models/contragent/contragent';

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
    // ! Employee
    getLegalContractorEmployeesList(id: number) {
        return this.http.get<[]>(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/employees`
        );
    }
    getDetailLegalContractorEmployee(id: number, employeId) {
        return this.http.get<IDetailLegalContractorEmployee>(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/employees/${employeId}`
        );
    }

    deleteLegalContractorEmployee(id: number, employeId) {
        return this.http.delete(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/employees/${employeId}`
        );
    }
    editLegalContractorEmployee(id: number, employeId, data) {
        return this.http.put(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/employees/${employeId}`,
            data
        );
    }
    createLegalContractorEmployee(id, data) {
        return this.http.post(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/employees`,
            data
        );
    }
    // ! Beneficares
    getLegalContractorBeneficiariesList(id: number) {
        return this.http.get<[]>(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/beneficiaries`
        );
    }
    getDetailLegalContractorBeneficiary(id: number, beneficiaryId) {
        return this.http.get<IDetailLegalContractorBeneficiary>(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/beneficiaries/${beneficiaryId}`
        );
    }

    deleteLegalContractorBeneficiary(id: number, beneficiaryId) {
        return this.http.delete(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/beneficiaries/${beneficiaryId}`
        );
    }
    editLegalContractorBeneficiary(id: number, beneficiaryId, data) {
        return this.http.put(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/beneficiaries/${beneficiaryId}`,
            data
        );
    }
    createLegalContractorBeneficiary(id, data) {
        return this.http.post(
            environment.contragentUrl +
                `/admin/api/v1/legal-contractors/${id}/beneficiaries`,
            data
        );
    }
}
