import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IListPartnerFeedbacks } from '../../../models/catalog/partners';

@Injectable({
    providedIn: 'root',
})
export class PartnerFeedbacksService {
    constructor(private http: HttpClient) {}
    getListPartnerFeedbacks(page = 1, filter) {
        const { name = '', passedModeration = '', partnerId = '' } = filter;
        return this.http.get<IListPartnerFeedbacks>(
            environment.catalogUrl +
                `/Administration/api/v1/feedbacks?partnerId=${partnerId}&passedModeration=${passedModeration}
&name=${name}&page=${page}&pageSize=20`
        );
    }
    getDetailPartnerFeedback(id: number) {
        // return this.http.get<IDetailPartnerFeedbacks>(
        //     environment.catalogUrl +
        //         `/Administration/api/v1/partner-proms/${id}`
        // );
    }
    deletePartnerFeedback(partnerId: number, feedbackId: number) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/${partnerId}/feedbacks/${feedbackId}`
        );
    }
    approvePartnerFeedback(partnerId: number, feedbackId) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/${partnerId}/feedbacks/${feedbackId}/check`,
            { coment: 'approve' }
        );
    }
}
