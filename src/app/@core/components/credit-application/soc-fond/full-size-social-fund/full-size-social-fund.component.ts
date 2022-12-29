import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ApplicationRequestsService } from '../../../../services/credit-application/credit.service';

@Component({
    selector: 'ngx-full-size-social-fund',
    templateUrl: './full-size-social-fund.component.html',
    styleUrls: ['./full-size-social-fund.component.scss'],
})
export class FullSizeSocialFundComponent implements OnInit, OnDestroy {
    pin: string;
    socialFund;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private applicationRequestsService: ApplicationRequestsService,
        private route: ActivatedRoute
    ) {}
    getSocialFund() {
        this.applicationRequestsService
            .getSocialFund(this.pin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.socialFund = data;
                },
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.pin = params['pin'];
            this.getSocialFund();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
