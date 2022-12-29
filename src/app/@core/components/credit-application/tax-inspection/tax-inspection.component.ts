import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';
import { truncateDecimals } from '../../../utils';

@Component({
    selector: 'ngx-tax-inspection',
    templateUrl: './tax-inspection.component.html',
    styleUrls: ['./tax-inspection.component.scss'],
})
export class TaxInspectionComponent implements OnInit {
    @Input() pin = '20040405032203';
    objectValues = Object.values;
    taxPayer;
    socialFundBalance;
    truncateDecimals;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private applicationRequestsService: ApplicationRequestsService
    ) {}
    getTaxInspectionTaxPayer() {
        this.applicationRequestsService
            .getTaxInspectionTaxPayer(this.pin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.taxPayer = data;
                },
            });
    }
    getTaxInspectionSocialFundBalance() {
        this.applicationRequestsService
            .getTaxInspectionSocialFundBalance(this.pin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.socialFundBalance = data;
                },
            });
    }
    ngOnInit(): void {
        this.getTaxInspectionTaxPayer();
        this.getTaxInspectionSocialFundBalance();
        this.truncateDecimals = truncateDecimals;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
