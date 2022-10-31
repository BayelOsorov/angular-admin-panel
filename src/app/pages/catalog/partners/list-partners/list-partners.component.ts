import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IListPartner } from '../../../../@core/models/catalog/partners';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
@Component({
    templateUrl: './list-partners.component.html',
    styleUrls: ['./list-partners.component.scss'],
})
export class ListPartnersComponent implements OnInit {
    listPartner: IListPartner;
    tableColumns = {
        id: { title: '№', type: 'number' },
        name: { title: 'Название', type: 'string' },
        categoryId: { title: 'Категория', type: 'number' },
        order: { title: 'Заказ', type: 'string' },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersService: PartnersService,
        private toaster: ToastrService,
        private router: Router
    ) {}
    getPartners(page = 1) {
        this.partnersService
            .getListPartners(page)
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
    deletePartner(event) {}

    ngOnInit(): void {
        this.getPartners();
    }
}
