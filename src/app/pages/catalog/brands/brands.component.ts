import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { AnyTxtRecord } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { BrandActionsModalComponent } from '../../../@core/components/catalog/brand/brand-actions-modal/brand-actions-modal.component';
import { TableComponent } from '../../../@core/components/table/table.component';
import { IListBrand } from '../../../@core/models/catalog/brand';
import { BrandsService } from '../../../@core/services/catalog/brands/brands.service';
import {
    filter,
    debounceTime,
    distinctUntilChanged,
    tap,
} from 'rxjs/operators';

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
        this.getBrands();
    }
    getBrands(page = 1, name = '') {
        this.brandService
            .getListBrand(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listBrand = res));
    }
    deleteBrand(id: number): void {
        this.brandService.deleteBrand(id).subscribe((res) => {
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
        this.openModal(false, BrandActionsModalComponent, {
            title: 'Редактирование бренда',
            context: { brandData: data },
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
                    (val === 'create' || val === 'edit') && this.getBrands()
            );
    }
}
