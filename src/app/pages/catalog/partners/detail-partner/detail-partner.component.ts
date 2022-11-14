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
import { BrandsService } from '../../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
import { ProductsService } from '../../../../@core/services/catalog/products/products.service';
import { TagsService } from '../../../../@core/services/catalog/tags/tags.service';

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
        private route: ActivatedRoute,
        private categoryService: CategoriesService,
        private brandService: BrandsService,
        private productService: ProductsService,
        private tagsService: TagsService
    ) {}

    getDetailPartner() {
        this.partnersService
            .getDetailPartner(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.partner = data;
                this.category = this.categoryService.getDetailCategory(
                    data.categoryId
                );
                this.brand = this.brandService.getDetailBrand(data.brandId);
                this.product = this.productService.getDetailProduct(
                    data.productId
                );
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.partnerId = params['id'];
        });
        this.getDetailPartner();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
