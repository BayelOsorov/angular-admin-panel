import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IListPartnerFeedbacks } from '../../../../@core/models/catalog/partners';
import { PartnerFeedbacksService } from '../../../../@core/services/catalog/partner-feedbacks/partner-feedbacks.service';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
import { truncateDecimals } from '../../../../@core/utils';
@Component({
    templateUrl: './detail-partner.component.html',
    styleUrls: ['./detail-partner.component.scss'],
})
export class DetailPartnerComponent implements OnInit, OnDestroy {
    partner;
    partnerId: number;
    feedbacks: IListPartnerFeedbacks;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private partnersService: PartnersService,
        private partnersFeedbacksService: PartnerFeedbacksService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    truncateDecimals(rate) {
        return truncateDecimals(rate, 1);
    }
    getDetailPartner() {
        this.partnersService
            .getDetailPartner(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.partner = data;
            });
    }
    getFeedbacks() {
        this.partnersFeedbacksService
            .getListPartnerFeedbacks(1, {
                partnerId: this.partnerId,
                passedModeration: true,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.feedbacks = data;
            });
    }
    updatePartner() {
        this.router.navigate([`catalog/partners/update/${this.partner.id}`]);
    }
    deletePartner() {
        this.partnersService
            .deletePartner(this.partner.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.router.navigate([`catalog/partners`]);
            });
    }
    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.partnerId = params['id'];
        });
        this.getDetailPartner();
        this.getFeedbacks();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
