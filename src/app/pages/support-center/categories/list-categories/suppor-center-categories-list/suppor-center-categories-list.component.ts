import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SupportCenterActionsModalComponent } from '../../../../../@core/components/support-center/actions-modal/actions-modal.component';
import { IListSupportCenterCategoriesAndProducts } from '../../../../../@core/models/support-center/support-center';
import { SupportCenterService } from '../../../../../@core/services/support-center/support-center.service';
import { tableNumbering, truncateText } from '../../../../../@core/utils';
@Component({
    templateUrl: './suppor-center-categories-list.component.html',
    styleUrls: ['./suppor-center-categories-list.component.scss'],
})
export class SupporCenterCategoriesListComponent implements OnInit, OnDestroy {
    listCategory: IListSupportCenterCategoriesAndProducts;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listCategory.page, cell.row.index),
        },

        name: {
            title: 'Название на RU',
            type: 'html',
            valuePrepareFunction: (item) =>
                `<div title='${item.ru}'>${truncateText(item.ru)}</div>`,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private supportService: SupportCenterService,
        private toaster: ToastrService,
        private router: Router,
        private windowService: NbWindowService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}
    ngOnInit(): void {
        this.getCategories();
    }
    getCategories(page = 1, name = '') {
        this.supportService
            .getListSupportCenterCategories(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listCategory = res));
    }
    deleteCategory(id: number): void {
        this.supportService
            .deleteSupportCenterCategory(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getCategories();
            });
    }
    createCategory(data) {
        this.supportService
            .createSupportCenterCategory(data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно создано!');
                this.dialogRef.close('create');
            });
    }
    updateCategory(id, data) {
        return this.supportService
            .editSupportCenterCategory(id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно отредактировано!');
                this.dialogRef.close('edit');
            });
    }
    rowSelect(id) {
        this.router.navigate([`support-center/categories/detail/${id}`]);
    }
    public openCreateModal() {
        this.openModal(false, SupportCenterActionsModalComponent, {
            title: 'Добавление категории',
            context: {
                placeholder: 'категории',
                createItem: this.createCategory,
            },
        });
    }
    public openEditModal(data) {
        this.openModal(false, SupportCenterActionsModalComponent, {
            title: 'Редактирование категории',
            context: {
                itemData: data,
                updateItem: this.updateCategory,
                placeholder: 'категории',
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
                    (val === 'create' || val === 'edit') && this.getCategories()
            );
    }
    onSearch(event) {
        this.getCategories(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
