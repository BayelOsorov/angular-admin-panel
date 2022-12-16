import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SupportCenterActionsModalComponent } from '../../../../../@core/components/support-center/actions-modal/actions-modal.component';
import { IListSupportCenterCategoriesAndProducts } from '../../../../../@core/models/support-center/support-center';
import { SupportCenterService } from '../../../../../@core/services/support-center/support-center.service';
import { tableNumbering } from '../../../../../@core/utils';
@Component({
    templateUrl: './support-center-products-list.component.html',
    styleUrls: ['./support-center-products-list.component.scss'],
})
export class SupportCenterProductsListComponent implements OnInit, OnDestroy {
    listProducts: IListSupportCenterCategoriesAndProducts;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listProducts.page, cell.row.index),
        },

        name: {
            title: 'Название на RU',
            type: 'text',
            valuePrepareFunction: (item) => item.ru,
        },

        answers: {
            title: 'Кол-во ответов',
            type: 'text',
            valuePrepareFunction: (item) => item.length,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private supportService: SupportCenterService,
        private toaster: ToastrService,
        private domSanitizer: DomSanitizer,
        private router: Router,
        private windowService: NbWindowService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}
    ngOnInit(): void {
        this.getProducts();
    }
    getProducts(page = 1, name = '') {
        this.supportService
            .getListSupportCenterProducts(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listProducts = res));
    }
    deleteProduct(id: number): void {
        this.supportService
            .deleteSupportCenterProduct(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getProducts();
            });
    }
    createProduct(data) {
        this.supportService
            .createSupportCenterProduct(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно создано!');
                this.dialogRef.close('create');
            });
    }
    updateProduct(id, data) {
        return this.supportService
            .editSupportCenterProduct(id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно отредактировано!');
                this.dialogRef.close('edit');
            });
    }
    rowSelect(id) {
        this.router.navigate([`support-center/products/detail/${id}`]);
    }
    public openCreateModal() {
        this.openModal(false, SupportCenterActionsModalComponent, {
            title: 'Добавление продукта',
            context: {
                placeholder: 'продукта',
                createItem: this.createProduct,
            },
        });
    }
    public openEditModal(data) {
        this.openModal(false, SupportCenterActionsModalComponent, {
            title: 'Редактирование продукта',
            context: {
                itemData: data,
                updateItem: this.updateProduct,
                placeholder: 'продукта',
            },
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
    onSearch(event) {
        this.getProducts(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
