import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailBrand } from '../../../../@core/models/catalog/brand';
import { BrandsService } from '../../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';
import { toBase64 } from '../../../../@core/utils/toBase64';
@Component({
    templateUrl: './actions-brand.component.html',
    styleUrls: ['./actions-brand.component.scss'],
})
export class ActionsBrandComponent implements OnInit, OnDestroy {
    form: FormGroup;
    brandData: IDetailBrand;
    brandId: number;
    submitted = false;
    categoryList = [];
    isLoading = false;
    logoImg;
    searchChange$ = new BehaviorSubject('');

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        private brandService: BrandsService,
        private route: ActivatedRoute,
        private router: Router,

        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(256)]],
            logo: ['', Validators.required],
            isActive: [true, Validators.required],
            order: ['', Validators.required],
            categoryId: ['', Validators.required],
        });
        this.getCategories();
        this.route.params.subscribe((params) => {
            this.brandId = params['id'];
        });
        if (this.brandId) {
            this.brandService
                .getDetailBrand(this.brandId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    this.brandData = data;
                    this.form.controls['name'].setValue(data.name);
                    this.form.controls['logo'].setValue(data.logo);
                    this.form.controls['isActive'].setValue(data.isActive);

                    this.form.controls['order'].setValue(data.order);
                    this.form.controls['categoryId'].setValue(data.categoryId);
                    this.logoImg = data.logo;
                });
        }
        console.log(this.logoImg);
    }
    getCategories(name = '') {
        this.categoryService
            .getListCategories(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoryList = res.items;
            });
    }

    onFirstSubmit() {
        this.submitted = true;

        if (this.form.valid) {
            if (this.brandData) {
                this.brandService
                    .editBrand(this.brandData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/brands`]);
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.brandService
                .createBrand(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/brands`]);
                    this.dialogRef.close('create');
                });
        }
    }

    onSearch(value: string): void {
        this.getCategories(value);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
