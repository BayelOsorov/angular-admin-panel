import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerFeedbacksService } from '../../../../services/catalog/partner-feedbacks/partner-feedbacks.service';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';

@Component({
    selector: 'ngx-partner-branches',
    templateUrl: './branches.component.html',
    styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit, OnDestroy {
    @Input() partnerId: number;
    listBranches;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersService: PartnersService,
        private router: Router,
        private toaster: ToastrService,
        private partnersFeedbacksService: PartnerFeedbacksService
    ) {}
    editBranch(id) {
        this.router.navigate([
            `catalog/partners/${this.partnerId}/branches/update/${id}`,
        ]);
    }
    deleteBranch(id) {
        this.partnersService
            .deletePartnerBranch(this.partnerId, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно удалено!');
                this.getBranches();
            });
    }
    translateWeekdays(str) {
        switch (str) {
            case 'Monday':
                return 'ПН';
            case 'Sunday':
                return 'ВС';
            case 'Saturday':
                return 'СБ';
            case 'Friday':
                return 'ПТ';
            case 'Thursday':
                return 'ЧТ';
            case 'Wednesday':
                return 'СР';
            case 'Tuesday':
                return 'ВТ';
            default:
                return str;
        }
    }
    getBranches(page = 1) {
        this.partnersService
            .getListPartnerBranches(page, this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.listBranches = data;
            });
    }

    ngOnInit(): void {
        this.getBranches();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
