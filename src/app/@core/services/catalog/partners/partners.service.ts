import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IDetailPartner,
    IDetailPartnerBranch,
    IListPartner,
    IListPartnerFeedbacks,
    IListPartnerImages,
} from '../../../models/catalog/partners';
import { HttpOptions } from '../../../utils';

@Injectable({
    providedIn: 'root',
})
export class PartnersService {
    constructor(private http: HttpClient) {}
    //  ! Partners CRUD
    getListPartners(page = 1, name = '') {
        return this.http.get<IListPartner>(
            environment.catalogUrl +
                `/Administration/api/v1/partners?name=${name}&page=${page}&pageSize=20`
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

    getListPartnerBranches(partnerId) {
        return this.http.get(
            environment.catalogUrl +
                `/Administration/api/v1/partners/${partnerId}/branches`
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

    // ! Partner Feedbacks

    getPartnerFeedbacks(page = 1, partnerId: number, passedModeration = '') {
        return this.http.get<IListPartnerFeedbacks>(
            environment.catalogUrl +
                `/Administration/api/v1/${partnerId}/feedbacks?passedModeration=${passedModeration}&page=${page}&pageSize=20`
        );
    }
    deletePartnerFeedback(partnerId: number, feedbackId: number) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/${partnerId}/feedbacks/${feedbackId}`
        );
    }
    editPartnerFeedback(partnerId: number, feedbackId: number, data) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/${partnerId}/feedbacks/${feedbackId}/check`,
            data
        );
    }
}
