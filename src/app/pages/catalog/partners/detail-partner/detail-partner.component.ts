import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailBrand } from '../../../../@core/models/catalog/brand';
import {
    IDetailProduct,
    IDetailTag,
} from '../../../../@core/models/catalog/catalog';
import { IDetailCategory } from '../../../../@core/models/catalog/category';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
@Component({
    templateUrl: './detail-partner.component.html',
    styleUrls: ['./detail-partner.component.scss'],
})
export class DetailPartnerComponent implements OnInit, OnDestroy {
    partner;
    partnerId: number;
    category: Observable<IDetailCategory>;
    brand: Observable<IDetailBrand>;
    product: Observable<IDetailProduct>;
    tags: Observable<IDetailTag>;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private partnersService: PartnersService,
        private route: ActivatedRoute
    ) {}

    getDetailPartner() {
        this.partnersService
            .getDetailPartner(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.partner = data;
            });
    }
    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.partnerId = params['id'];
        });
        this.getDetailPartner();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
