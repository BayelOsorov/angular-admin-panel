import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../@core/components/avatar-img/avatar-img.component';
import { BrandActionsModalComponent } from '../../../@core/components/catalog/brand/brand-actions-modal/brand-actions-modal.component';
import { UseHttpImageSourcePipe } from '../../../@core/components/secured-image/secured-image.component';
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
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listBrand.pageNumber, cell.row.index),
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
        categoryId: {
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
        private brandService: BrandsService,
        private categoryService: CategoriesService,
        private router: Router,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}
    ngOnInit(): void {
        this.getBrands();
    }
    getBrands(page = 1, name = '') {
        this.brandService
            .getListBrand(page, name)
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
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getBrands();
            });
    }
    onSearch(event) {
        this.getBrands(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, BrandActionsModalComponent, {
            title: 'Добавление бренда',
            context: {},
        });
    }
    public openEditModal(data) {
        // this.openModal(false, BrandActionsModalComponent, {
        //     title: 'Редактирование бренда',
        //     context: { brandData: data },
        // });
        this.router.navigate([`catalog/brands/update/${data.id}`]);
    }
    public openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) =>
                    (val === 'create' || val === 'edit') && this.getBrands()
            );
    }
}
