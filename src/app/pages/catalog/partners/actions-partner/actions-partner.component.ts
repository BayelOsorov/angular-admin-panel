import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BrandsService } from '../../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
import { ProductsService } from '../../../../@core/services/catalog/products/products.service';
import { TagsService } from '../../../../@core/services/catalog/tags/tags.service';

@Component({
    templateUrl: './actions-partner.component.html',
    styleUrls: ['./actions-partner.component.scss'],
})
export class ActionsPartnerComponent implements OnInit, OnDestroy {
    form: FormGroup;
    logoImg;
    submitted = false;
    categories = [];
    brands = [];
    tags = [];
    products = [];
    partnerData;
    partnerId: number;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnersService: PartnersService,
        private categoryService: CategoriesService,
        private productService: ProductsService,
        private tagsService: TagsService,
        private brandService: BrandsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.partnerData) {
                this.partnersService
                    .editPartner(this.partnerData.id, {
                        ...this.form.value,
                        description: {
                            ru: this.form.value.descRu,
                            kg: this.form.value.descKg,
                            uz: this.form.value.descUz,
                        },
                        shortDescription: {
                            ru: this.form.value.shortDescRu,
                            kg: this.form.value.shortDescKg,
                            uz: this.form.value.shortDescUz,
                        },
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/partners`]);
                    });
                return;
            }

            this.partnersService
                .createPartner({
                    ...this.form.value,
                    description: {
                        ru: this.form.value.descRu,
                        kg: this.form.value.descKg,
                        uz: this.form.value.descUz,
                    },
                    shortDescription: {
                        ru: this.form.value.shortDescRu,
                        kg: this.form.value.shortDescKg,
                        uz: this.form.value.shortDescUz,
                    },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/partners`]);
                });
        }
    }

    getData() {
        this.getProducts();
        this.getTags();
        this.getCategories();
        this.getBrands();
    }
    getProducts(name = '') {
        this.productService
            .getListProducts(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.products = res.items));
    }
    getTags(name = '') {
        this.tagsService
            .getListTags(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.tags = res.items));
    }
    getCategories(name = '') {
        this.categoryService
            .getListCategories(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.categories = res.items));
    }
    getBrands(name = '') {
        this.brandService
            .getListBrand(1, { name, categoryId: '' })
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.brands = res.items));
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(256)]],
            logo: ['', Validators.required],
            isActive: [true, Validators.required],
            descRu: ['', [Validators.required, Validators.maxLength(4096)]],
            descKg: ['', [Validators.required, Validators.maxLength(4096)]],
            descUz: ['', [Validators.required, Validators.maxLength(4096)]],
            shortDescRu: [
                '',
                [Validators.required, Validators.maxLength(1024)],
            ],
            shortDescKg: [
                '',
                [Validators.required, Validators.maxLength(1024)],
            ],
            shortDescUz: [
                '',
                [Validators.required, Validators.maxLength(1024)],
            ],
            categories: [[], Validators.required],
            products: [[], Validators.required],
            brands: [[], Validators.required],
            tags: [[], Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.partnerId = params['id'];
        });
        if (this.partnerId) {
            this.partnersService
                .getDetailPartner(this.partnerId)
                .pipe(
                    takeUntil(this.destroy$),
                    map((res) => {
                        if (
                            res.tags.length > 0 &&
                            res.products.length > 0 &&
                            res.brands.length > 0 &&
                            res.categories.length > 0
                        ) {
                            const newTags = res.tags.map((item) => item.id);
                            const newProducts = res.products.map(
                                (item) => item.id
                            );
                            const newBrands = res.brands.map((item) => item.id);
                            const newCategories = res.categories.map(
                                (item) => item.id
                            );

                            return {
                                ...res,
                                tags: newTags,
                                products: newProducts,
                                brands: newBrands,
                                categories: newCategories,
                            };
                        }
                        return res;
                    })
                )
                .subscribe({
                    next: (data) => {
                        this.partnerData = data;
                        this.form.controls['name'].setValue(data.name);
                        this.form.controls['isActive'].setValue(data.isActive);
                        this.form.controls['logo'].setValue(data.logo);
                        this.form.controls['categories'].setValue(
                            data.categories
                        );
                        this.form.controls['brands'].setValue(data.brands);

                        this.form.controls['products'].setValue(data.products);
                        this.form.controls['tags'].setValue(data.tags);
                        this.form.controls['descRu'].setValue(
                            data.description.ru
                        );
                        this.form.controls['descKg'].setValue(
                            data.description.kg
                        );
                        this.form.controls['descUz'].setValue(
                            data.description.uz
                        );

                        this.form.controls['shortDescRu'].setValue(
                            data.shortDescription.ru
                        );
                        this.form.controls['shortDescKg'].setValue(
                            data.shortDescription.kg
                        );
                        this.form.controls['shortDescUz'].setValue(
                            data.shortDescription.uz
                        );
                    },
                });
        }

        this.getData();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
