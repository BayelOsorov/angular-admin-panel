import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
        name: { title: 'Название', type: 'string' },
        categoryName: { title: 'Категория', type: 'string' },
        priductName: { title: 'Продукт', type: 'string' },
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
    onSearch(event) {}
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
