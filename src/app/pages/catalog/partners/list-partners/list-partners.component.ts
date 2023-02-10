import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../../@core/components/shared/avatar-img/avatar-img.component';
import { IListPartner } from '../../../../@core/models/catalog/partners';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-partners.component.html',
    styleUrls: ['./list-partners.component.scss'],
})
export class ListPartnersComponent implements OnInit, OnDestroy {
    listPartner: IListPartner;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartner.page, cell.row.index),
        },
        logo: {
            title: 'Лого',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        name: { title: 'Название', type: 'text' },
        categories: {
            title: 'Категория',
            type: 'text',
            valuePrepareFunction: (value) =>
                value.length > 0 ? value.map((item) => item.name) : '',
        },
        products: {
            title: 'Продукт',
            type: 'text',
            valuePrepareFunction: (value) =>
                value.length > 0 ? value.map((item) => item.name) : '',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersService: PartnersService,
        private toaster: ToastrService,
        private router: Router
    ) {}
    getPartners(page = 1, name = '') {
        this.partnersService
            .getListPartners(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPartner = res));
    }
    updatePartner(data) {
        this.router.navigate([`catalog/partners/update/${data.id}`]);
    }
    userRowSelect(id) {
        this.router.navigate([`catalog/partners/detail/${id}`]);
    }
    deletePartner(id) {
        this.partnersService
            .deletePartner(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getPartners();
            });
    }

    ngOnInit(): void {
        this.getPartners();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
