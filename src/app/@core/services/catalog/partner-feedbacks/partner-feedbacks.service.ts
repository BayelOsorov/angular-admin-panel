import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
    IListPartnerFeedbacks,
    IPartnerFeedback,
} from '../../../models/catalog/partners';

@Injectable({
    providedIn: 'root',
})
export class PartnerFeedbacksService {
    constructor(private http: HttpClient) {}
    getListPartnerFeedbacks(page = 1, filter) {
        const { passedModeration = false, partnerId = '' } = filter;
        return this.http.get<IListPartnerFeedbacks>(
            environment.catalogUrl +
                `/Administration/api/v1/feedbacks?partnerId=${partnerId}&passedModeration=${passedModeration}&page=${page}&pageSize=20`
        );
    }
    getDetailPartnerFeedback(id: number) {
        return this.http.get<IPartnerFeedback>(
            environment.catalogUrl + `/Administration/api/v1/feedbacks/${id}`
        );
    }
    deletePartnerFeedback(partnerId, feedbackId: number) {
        return this.http.delete(
            environment.catalogUrl +
                `/Administration/api/v1/feedbacks/${feedbackId}?partnerId=${partnerId}`
        );
    }
    approvePartnerFeedback(partnerId: number, feedbackId) {
        return this.http.put(
            environment.catalogUrl +
                `/Administration/api/v1/feedbacks/${feedbackId}/check?partnerId=${partnerId}`,
            { coment: 'approve' }
        );
    }
}
