import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IDetailPartner,
    IDetailPartnerBranch,
    IListPartner,
    IListPartnerImages,
} from '../../../models/catalog/partners';
import { HttpOptions } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class PartnersService {
    constructor(private http: HttpClient) {}
    getListPartners(page = 1, name = '') {
        return this.http.get<IListPartner>(
            environment.catalogUrl +
                `/Administration/api/v1/partners?name=${name}&page=${page}&orderType=desc&orderBy=CreatedAt&pageSize=20`
        );
    }

    getDetailPartner(id: number) {
        return this.http.get<IDetailPartner>(
            environment.catalogUrl + `/Administration/api/v1/partners/${id}`
        );
    }

    deletePartner(id: number) {
        return this.http.delete(
            environment.catalogUrl + `/Administration/api/v1/partners/${id}`
        );
    }
    editPartner(id: number, data) {
        return this.http.put(
            environment.catalogUrl + `/Administration/api/v1/partners/${id}`,
            data
        );
    }
    createPartner(data) {
        return this.http.post(
            environment.catalogUrl + `/Administration/api/v1/partners`,
            data
        );
    }
    getListPartnerImages(page = 1, id) {
        return this.http.get<IListPartnerImages>(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/images?page=${page}&pageSize=20`
        );
    }
    addPartnerImage(id, data) {
        return this.http.post(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/images`,
            data
        );
    }
    getPartnerImage(id: number, imgId) {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/images/${imgId}`,
            HttpOptions
        );
    }
    editPartnerImage(partnerId: number, imgId: number, data) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/images/${imgId}`,
            data
        );
    }
    deletePartnerImage(partnerId: number, imgId: string) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/images/${imgId}`
        );
    }

    // ! Partner Branches

    getListPartnerBranches(page = 1, partnerId) {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/branches?page=${page}&pageSize=20`
        );
    }
    getDetailPartnerBranch(id: number, branchId) {
        return this.http.get<IDetailPartnerBranch>(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/branches/${branchId}`
        );
    }

    deletePartnerBranch(id: number, branchId) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/branches/${branchId}`
        );
    }
    editPartnerBranch(partnerId, branchId: number, data) {
        return this.http.patch(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/branches/${branchId}`,
            data
        );
    }
    createPartnerBranch(partnerId, data) {
        return this.http.post(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/branches`,
            data
        );
    }

    // ! Partner Messengers
    getListPartnerMessengers(partnerId) {
        return this.http.get<[]>(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/messengers`
        );
    }

    deletePartnerMessenger(partnerId: number, id: number) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/messengers/${id}`
        );
    }
    editPartnerMessenger(partnerId, id: number, data) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/messengers/${id}`,
            data
        );
    }
    createPartnerMessenger(partnerId, data) {
        return this.http.post(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/messengers`,
            data
        );
    }
}
