import { Component, OnInit } from '@angular/core';
import { LegalContractorsService } from '../../../../../@core/services/contragents/legal-contractors.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
    templateUrl: './actions-beneficiary-legal-contractor.component.html',
    styleUrls: ['./actions-beneficiary-legal-contractor.component.scss'],
})
export class ActionsBeneficiaryLegalContractorComponent implements OnInit {
    contractorId;
    beneficiaryId;
    contractorData;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private legalContractorsService: LegalContractorsService,
        private toaster: ToastrService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    editItem(data) {
        this.legalContractorsService
            .editLegalContractorBeneficiary(
                data.contractorId,
                data.beneficiaryId,
                data.data
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно отредактировано!');
                this.location.back();
            });
    }
    createItem(data) {
        this.legalContractorsService
            .createLegalContractorBeneficiary(data.contractorId, data.data)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно создано!');
                this.location.back();
            });
    }
    getDetailItem() {
        this.legalContractorsService
            .getDetailLegalContractorBeneficiary(
                this.contractorId,
                this.beneficiaryId
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.contractorData = data;
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.contractorId = params['id'];
            this.beneficiaryId = params['itemId'];
        });
        if (this.beneficiaryId) {
            this.getDetailItem();
        }
    }
}
