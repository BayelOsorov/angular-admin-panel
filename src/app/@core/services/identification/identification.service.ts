import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../models/identification/identification';

@Injectable({
    providedIn: 'root',
})
export class IdentificationService {
    constructor(private http: HttpClient) {}

    getPhotoIdentification() {
        return this.http.get<IIdentificationDetail>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/next-photo-identification-request`
        );
    }
    getVideoIdentification() {
        return this.http.get<IIdentificationDetail>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/next-video-identification-request`
        );
    }
    getIdentificationDetail() {
        return this.http.get<IIdentificationDetail>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/in-process`
        );
    }
    getUserPersonalData(data) {
        return this.http.get<IPersonalData>(
            environment.identificationUrl +
                `/operator/api/v1/personal-data/search?pin=${data.pin}&documentType=${data.documentType}&documentNumber=${data.documentNumber}`
        );
    }
    approvePhotoIdentification(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/approve-photo-identification`,
            { comment: 'approve' }
        );
    }
    declinePhotoIdentification(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/decline-photo-identification`,
            { comment: 'approve' }
        );
    }
    needToEditPhotoIdentification(id, data) {
        return this.http.post(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/require-photo-identification-edit`,
            data
        );
    }
    approveVideoIdentification(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/approve-video-identification`,
            { comment: 'approve' }
        );
    }
    declineVideoIdentification(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/decline-video-identification`,
            { comment: 'approve' }
        );
    }
}
