import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IDetailPartner, IListPartner } from '../../../models/catalog/partners';
import { HttpOptions } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class PartnersService {
    constructor(private http: HttpClient) {}

    getListPartners(page = 1) {
        return this.http.get<IListPartner>(
            environment.catalogUrl +
                `/Administration/api/v1/partners?page=${page}&pageSize=20`
        );
    }
    getListPartnersSearch(query = '') {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/partners/search?query=${query}`
        );
    }
    getDetailPartner(id: number) {
        return this.http.get<IDetailPartner>(
            environment.catalogUrl + `/Administration/api/v1/partners/${id}`
        );
    }
    getPartnerLogoImg(id: number, imgId) {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${id}/logo/${imgId}`,
            HttpOptions
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
    getListPartnerImages(id, page = 1) {
        return this.http.get(
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
}
