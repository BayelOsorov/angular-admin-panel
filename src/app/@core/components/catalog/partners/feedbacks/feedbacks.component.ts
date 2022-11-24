import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerFeedbacksService } from '../../../../services/catalog/partner-feedbacks/partner-feedbacks.service';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
@Component({
    selector: 'ngx-feedbacks',
    templateUrl: './feedbacks.component.html',
    styleUrls: ['./feedbacks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksComponent implements OnInit, OnDestroy {
    @Input() partnerId: number;
    listFeedbacks;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersFeedbacksService: PartnerFeedbacksService,
        private router: Router
    ) {}
    editBranch(id) {
        this.router.navigate([
            `catalog/partners/${this.partnerId}/branches/update/${id}`,
        ]);
    }

    getFeedbacks(page = 1) {
        this.partnersFeedbacksService
            .getListPartnerFeedbacks(page, {
                partnerId: this.partnerId,
                passedModeration: true,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listFeedbacks = data;
            });
    }
    ngOnInit(): void {
        this.getFeedbacks();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
