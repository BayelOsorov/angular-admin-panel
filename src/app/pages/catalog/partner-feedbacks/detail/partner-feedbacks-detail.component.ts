import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPartnerFeedback } from '../../../../@core/models/catalog/partners';
import { PartnerFeedbacksService } from '../../../../@core/services/catalog/partner-feedbacks/partner-feedbacks.service';

@Component({
    templateUrl: './partner-feedbacks-detail.component.html',
    styleUrls: ['./partner-feedbacks-detail.component.scss'],
})
export class PartnerFeedbacksDetailComponent implements OnInit, OnDestroy {
    feedbackData: IPartnerFeedback;
    feedbackId: number;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerFeedbacksService: PartnerFeedbacksService,
        private datePipe: DatePipe,
        private toaster: ToastrService,
        private location: Location,
        private route: ActivatedRoute
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getDetailPartnerFeedback() {
        this.partnerFeedbacksService
            .getDetailPartnerFeedback(this.feedbackId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.feedbackData = res));
    }
    approveFeedback() {
        this.partnerFeedbacksService
            .approvePartnerFeedback(
                this.feedbackData.partner.id,
                this.feedbackId
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно одобрили отзыв!');
                this.location.back();
            });
    }
    deleteFeedback() {
        this.partnerFeedbacksService
            .deletePartnerFeedback(
                this.feedbackData.partner.id,
                this.feedbackId
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно отклонили отзыв!');
                this.location.back();
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.feedbackId = params['id'];
        });
        this.getDetailPartnerFeedback();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
