import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailBrand } from '../../../../models/catalog/brand';
import { BrandsService } from '../../../../services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../services/catalog/categories/categories.service';
import { blobToBase64, toBase64 } from '../../../../utils/toBase64';
@Component({
    selector: 'ngx-brand-actions-modal',
    templateUrl: './brand-actions-modal.component.html',
    styleUrls: ['./brand-actions-modal.component.scss'],
})
export class BrandActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    brandData: IDetailBrand;
    categoryList = [];
    isLoading = false;
    logoImg;
    submitted = false;
    searchChange$ = new BehaviorSubject('');

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        private brandService: BrandsService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            Logo: ['', Validators.required],
            isActive: [true, Validators.required],
            order: ['', Validators.required],
            categoryId: ['', Validators.required],
        });
        this.getCategories();

        if (this.brandData) {
            this.form.controls['name'].setValue(this.brandData.name);
            this.form.controls['Logo'].setValue(this.brandData.logo);
            this.form.controls['isActive'].setValue(this.brandData.isActive);

            this.form.controls['order'].setValue(this.brandData.order);
            this.form.controls['categoryId'].setValue(
                this.brandData.categoryId
            );
            console.log(this.brandData);

            this.getLogImg();
        }
    }
    getCategories(name = '') {
        this.categoryService
            .getListCategories(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoryList = res.items;
            });
    }
    getLogImg() {
        this.brandService
            .getBrandLogoImg(this.brandData.id, this.brandData.logo)
            .pipe(takeUntil(this.destroy$))
            .subscribe(async (res) => {
                this.logoImg = await blobToBase64(res, (img: any) => img);
            });
    }
    onFirstSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            console.log(this.form.value);
            if (this.brandData) {
                this.brandService
                    .editBrand(this.brandData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.brandService
                .createBrand(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.dialogRef.close('create');
                });
        }
    }
    async onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const logo = await toBase64(file);
            this.logoImg = `data:image/jpeg;base64,${logo}`;
            this.form.patchValue({
                Logo: logo,
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
