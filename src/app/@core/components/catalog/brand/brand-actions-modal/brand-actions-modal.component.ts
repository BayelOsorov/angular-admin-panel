import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailBrand } from '../../../../models/catalog/brand';
import { CategoriesService } from '../../../../services/catalog/categories/categories.service';

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
    searchChange$ = new BehaviorSubject('');

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    compareFn = (o1: any, o2: any) =>
        o1 && o2 ? console.log(o1, o2) : o1 === o2;
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            logo: ['', Validators.required],
            order: ['', Validators.required],
            categoryId: ['', Validators.required],
        });
        this.getCategories();
        console.log(this.brandData);

        if (this.brandData) {
            this.form.controls['name'].setValue(this.brandData.name);
            this.form.controls['logo'].setValue(this.brandData.logo);
            this.form.controls['order'].setValue(this.brandData.order);
            this.form.controls['categoryId'].setValue(
                this.brandData.categoryId
            );
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
    onFirstSubmit() {
        if (this.form.valid) {
        }
    }
    onSearch(value: string): void {
        // this.isLoading = true;
        // this.searchChange$.next(value);
        this.getCategories(value);
    }
    ngOnDestroy() {
        // this.destroy$.next();
        // this.destroy$.complete();
    }
}
