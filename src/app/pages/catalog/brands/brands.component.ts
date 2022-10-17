import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

    constructor(private brandService: BrandsService) {}

    ngOnInit(): void {
        this.getBrands(1, '');
    }
    getBrands(page, name) {
        this.brandService
            .getListBrand()
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listBrand = res));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
