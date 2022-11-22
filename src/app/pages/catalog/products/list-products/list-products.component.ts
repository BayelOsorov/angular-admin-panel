import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductActionsModalComponent } from '../../../../@core/components/catalog/product/product-actions-modal/product-actions-modal.component';
import { ProductsService } from '../../../../@core/services/catalog/products/products.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
    listProducts;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listProducts.page, cell.row.index),
        },
        name: {
            title: 'Название',
            type: 'string',
        },
        isActive: {
            title: 'Активен',
            type: 'string',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private productService: ProductsService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }
    getProducts(page = 1, name = '') {
        this.productService
            .getListProducts(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listProducts = res));
    }
    deleteProduct(id: number): void {
        this.productService
            .deleteProduct(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getProducts();
            });
    }
    onSearch(event) {
        this.getProducts(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, ProductActionsModalComponent, {
            title: 'Добавление продукта',
            context: {},
        });
    }
    public openEditModal(data) {
        this.openModal(false, ProductActionsModalComponent, {
            title: 'Редактирование продукта',
            context: { itemData: data },
        });
    }
    public openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) =>
                    (val === 'create' || val === 'edit') && this.getProducts()
            );
    }
}
