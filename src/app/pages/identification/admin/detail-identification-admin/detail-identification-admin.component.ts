import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../../@core/models/identification/identification';
import { ApplicationRequestsService } from '../../../../@core/services/credit-application/credit.service';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';

@Component({
    templateUrl: './detail-identification-admin.component.html',
    styleUrls: ['./detail-identification-admin.component.scss'],
})
export class DetailIdentificationAdminComponent implements OnInit, OnDestroy {
    data: IIdentificationDetail;
    personalData: IPersonalData;
    customerInfo;
    identificationId;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private applicationRequestsService: ApplicationRequestsService,
        private route: ActivatedRoute
    ) {}
    getIdentificationDetail() {
        this.identificationService
            .getIdentificationDetailById(this.identificationId)
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
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.identificationId = params['id'];
        });
        this.getIdentificationDetail();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
