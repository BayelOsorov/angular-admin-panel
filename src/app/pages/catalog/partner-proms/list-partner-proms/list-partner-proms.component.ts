import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../../@core/components/avatar-img/avatar-img.component';
import { IListPartnerProms } from '../../../../@core/models/catalog/catalog';
import { PartnerPromsService } from '../../../../@core/services/catalog/partner-proms/partner-proms.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './list-partner-proms.component.html',
    styleUrls: ['./list-partner-proms.component.scss'],
})
export class ListPartnerPromsComponent implements OnInit, OnDestroy {
    listPartnerProms: IListPartnerProms;
    src;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartnerProms.page, cell.row.index),
        },
        cover: {
            title: 'Обложка',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        title: {
            title: 'Заголовок',
            type: 'string',
        },
        startDateTime: {
            title: 'Дата начала',
            type: 'string',
            valuePrepareFunction: (item) => this.parseDate(item),
        },

        endDateTime: {
            title: 'Дата окончания',
            type: 'string',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerPromsService: PartnerPromsService,
        private datePipe: DatePipe,
        private toaster: ToastrService,
        private router: Router
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, hh:mm');
    }
    getPartnerProms(page = 1, name = '') {
        this.partnerPromsService
            .getListPartnerProms(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPartnerProms = res));
    }
    onSearch(event) {
        this.getPartnerProms(1, event);
    }
    updatePartnerProms(data) {
        this.router.navigate([`catalog/partner-proms/update/${data.id}`]);
    }
    userRowSelect(id) {
        // this.router.navigate([`catalog/partner-proms/detail/${id}`]);
    }
    deletePartnerProms(id) {
        this.partnerPromsService
            .deletePartnerProms(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getPartnerProms();
            });
    }

    ngOnInit(): void {
        this.getPartnerProms();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
