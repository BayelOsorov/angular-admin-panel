import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalContractorsService } from '../../../../../@core/services/contragents/legal-contractors.service';
@Component({
    selector: 'ngx-legal-contractor-detail',
    templateUrl: './legal-contractor-detail.component.html',
    styleUrls: ['./legal-contractor-detail.component.scss'],
})
export class LegalContractorDetailComponent implements OnInit, OnDestroy {
    contractorId;
    contractorData;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private legalContractorsService: LegalContractorsService
    ) {}

    getDetailConractor() {
        this.legalContractorsService
            .getDetailLegalContractor(this.contractorId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => (this.contractorData = data));
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.contractorId = params['id'];
            this.getDetailConractor();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
