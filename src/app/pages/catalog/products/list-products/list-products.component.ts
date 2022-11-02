import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductActionsModalComponent } from '../../../../@core/components/catalog/product/product-actions-modal/product-actions-modal.component';
import { ProductsService } from '../../../../@core/services/catalog/products/products.service';
@Component({
    templateUrl: './list-products.component.html',
    styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
    listProducts;
    tableColumns = {
        id: {
            title: '№',
            type: 'number',
        },
        name: {
            title: 'Название',
            type: 'string',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private productService: ProductsService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getProdgetListProducts();
    }
    getProdgetListProducts(page = 1, name = '') {
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
                this.getProdgetListProducts();
            });
    }
    onSearch(event) {
        this.getProdgetListProducts(1, event);
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
                    (val === 'create' || val === 'edit') &&
                    this.getProdgetListProducts()
            );
    }
}
