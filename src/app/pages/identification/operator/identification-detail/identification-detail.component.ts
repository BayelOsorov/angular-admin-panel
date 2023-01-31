import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../../@core/models/identification/identification';
import { ApplicationRequestsService } from '../../../../@core/services/credit-application/credit.service';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';

@Component({
    templateUrl: './identification-detail.component.html',
    styleUrls: ['./identification-detail.component.scss'],
})
export class IdentificationDetailComponent implements OnInit, OnDestroy {
    data: IIdentificationDetail;
    personalData: IPersonalData;
    customerInfo;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private applicationRequestsService: ApplicationRequestsService
    ) {}
    getIdentificationDetail() {
        this.identificationService
            .getIdentificationDetail()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.data = data;
                this.getCustomerData(data.userId);
                this.getUserPersonalData({
                    pin: data.pin,
                    documentNumber: data.documentNumber,
                    documentType: data.documentType,
                });
            });
    }
    getUserPersonalData(data) {
        this.identificationService
            .getUserPersonalData(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.personalData = res;
            });
    }
    getCustomerData(id) {
        this.applicationRequestsService
            .getCustomerData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.customerInfo = data;
                },
            });
    }
    ngOnInit(): void {
        this.getIdentificationDetail();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
