import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../@core/components/avatar-img/avatar-img.component';
import { IListBrand } from '../../../@core/models/catalog/brand';
import { BrandsService } from '../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../@core/services/catalog/categories/categories.service';
import { tableNumbering } from '../../../@core/utils';

@Component({
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {
    listBrand: IListBrand;
    categoryList = [];
    form = this.fb.group({
        name: '',
        categoryId: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listBrand.page, cell.row.index),
        },
        logo: {
            title: 'Лого',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        name: {
            title: 'Название',
            type: 'string',
        },
        categoryName: {
            title: 'Категория',
            type: 'number',
        },
        order: {
            title: 'Порядок',
            type: 'string',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private router: Router,
        private toaster: ToastrService
    ) {}
    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getBrands(1, data);
            });
        this.getBrands();
    }
    getBrands(page = 1, filter = { categoryId: '', name: '' }) {
        this.brandService
            .getListBrand(page, filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listBrand = res));
    }
    getCategories(name = '') {
        this.categoryService
            .getListCategories(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoryList = res.items;
            });
    }
    deleteBrand(id: number): void {
        this.brandService
            .deleteBrand(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно удалено!');
                this.getBrands();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public editBrand(data) {
        this.router.navigate([`catalog/brands/update/${data.id}`]);
    }
}
