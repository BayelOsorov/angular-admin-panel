import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrandActionsModalComponent } from '../../../@core/components/catalog/brand/brand-actions-modal/brand-actions-modal.component';
import { IListBrand } from '../../../@core/models/catalog/brand';
import { BrandsService } from '../../../@core/services/catalog/brands/brands.service';

@Component({
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {
    listBrand: IListBrand;
    tableColumns = {
        id: {
            title: '№',
            type: 'number',
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
            title: 'Заказ',
            type: 'string',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private brandService: BrandsService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getBrands(1, '');
    }
    getBrands(page, name) {
        this.brandService
            .getListBrand()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listBrand = res));
    }
    deleteBrand(id) {
        this.brandService
            .deleteBrand(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getBrands(1, '');
            });
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
        //     context: {},
        // });

        this.windowService
            .open(BrandActionsModalComponent, {
                closeOnBackdropClick: false,
                title: 'Редактирование бренда',
                context: { brandData: data },
            })
            .onClose.subscribe(
                (val) => val === 'edit' && this.getBrands(1, '')
            );
    }
    public openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) => val === 'create' && this.getBrands(1, '')
            );
    }
}
