import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
    IIdentificationDetail,
    IPersonalData,
    IVideoIdentification,
} from '../../models/identification/identification';

@Injectable({
    providedIn: 'root',
})
export class IdentificationService {
    constructor(private http: HttpClient) {}
    getListIdentification(page, filter) {
        return this.http.get(
            environment.identificationUrl +
                `/admin/api/v1/identification-requests?pageNumber=${page}&pin=${
                    filter.pin
                }${
                    filter.status && `&statusList=${filter.status}`
                }&phoneNumber=${filter.phoneNumber}&pageSize=20`
        );
    }
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
    getIdentificationDetailById(id) {
        return this.http.get<IIdentificationDetail>(
            environment.identificationUrl +
                `/admin/api/v1/identification-requests/${id}`
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
            { comment: 'dec;ine' }
        );
    }
    suspendVideoIdentification(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/suspend-video-identification`,
            { comment: 'suspend' }
        );
    }
    connectVideo(id, data) {
        return this.http.post<IVideoIdentification>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/start-video-identification-call`,
            data
        );
    }
    sendComment(id, data) {
        return this.http.post(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests-comments?id=${id}`,
            data
        );
    }
    sendVideo(id, data) {
        return this.http.post(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/attach-external-call-video`,
            data
        );
    }
    stopVideo(id, data) {
        return this.http.post<IVideoIdentification>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/${id}/stop-video-identification-call`,
            data
        );
    }
    getIdentificationAppCount() {
        return this.http.get<any>(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/new-identification-requests-info`
        );
    }
    createUserDocument(id, data) {
        return this.http.post(
            environment.identificationUrl + `/admin/api/v1/users/files/${id}`,
            data
        );
    }
    getUserDocuments(id) {
        return this.http.get(
            environment.identificationUrl +
                `/admin/api/v1/users/files/${id}/links`
        );
    }
    offlineIdentificateUser(id) {
        return this.http.patch(
            environment.identificationUrl +
                `/admin/api/v1/users/${id}/offline-identification`,
            { comment: 'gg' }
        );
    }
    getListIdentificateObservation(page, filter) {
        return this.http.get(
            environment.identificationUrl +
                `/admin/api/v1/customer-identification-observation/in-process?pageNumber=${page}&minutes=${filter.minutes}&dateTime=${filter.dateTime}&pageSize=20`
        );
    }
    getListNoneIdentificateObservation(page, filter) {
        return this.http.get(
            environment.identificationUrl +
                `/admin/api/v1/customer-identification-observation/not-identified?pageNumber=${page}&minutes=${filter.minutes}&dateTime=${filter.dateTime}&pageSize=20`
        );
    }
    sendReportCommentIdentification(id, data) {
        return this.http.post(
            environment.identificationUrl +
                `/operator/api/v1/customers/${id}/observation-comments`,
            data
        );
    }
}
