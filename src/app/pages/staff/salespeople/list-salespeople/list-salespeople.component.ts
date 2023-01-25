import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateSellerComponent } from '../../../../@core/components/staff/create-seller/create-seller.component';
import { SalespeopleService } from '../../../../@core/services/staff/salespeople.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-salespeople.component.html',
    styleUrls: ['./list-salespeople.component.scss'],
})
export class ListSalespeopleComponent implements OnInit, OnDestroy {
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
            type: 'text',
        },
        isActive: {
            title: 'Активен',
            type: 'text',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
    };
    form = this.fb.group({
        userIds: [''],
    });
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private salesPeopleService: SalespeopleService,
        private windowService: NbWindowService,
        private toaster: ToastrService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getListSalespeople(1);
            });
        this.getListSalespeople();
    }
    getListSalespeople(page = 1) {
        this.salesPeopleService
            .getListSalespeople(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listProducts = res));
    }
    deleteProduct(id): void {
        this.salesPeopleService
            .deleteSalesperson(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getListSalespeople();
            });
    }
    onSearch(event) {
        this.getListSalespeople(1);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, CreateSellerComponent, {
            title: 'Добавление продукта',
            context: {},
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
                    this.getListSalespeople()
            );
    }
}
