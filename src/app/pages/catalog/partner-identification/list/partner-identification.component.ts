import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBadgeComponent } from '../../../../@core/components/shared/status-badge/status-badge.component';
import { IPartnerIdentificationList } from '../../../../@core/models/catalog/partners';
import { PartnerIdentificationService } from '../../../../@core/services/catalog/partner-identification/partner-identification.service';
import { OldBackendService } from '../../../../@core/services/old-backend/old-backend.service';
import { tableNumbering, trEngToRusOwnerST } from '../../../../@core/utils';
@Component({
    templateUrl: './partner-identification.component.html',
    styleUrls: ['./partner-identification.component.scss'],
})
export class PartnerIdentificationComponent implements OnInit, OnDestroy {
    listPartners: IPartnerIdentificationList;
    categories = [];

    form = this.fb.group({
        name: [''],
        status: ['Created'],
        categoryId: [''],
        phone: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartners.pageNumber, cell.row.index),
        },

        shopName: { title: 'Название', type: 'text' },
        clientPhoneNumber: {
            title: 'Номер телефона',
            type: 'html',
            valuePrepareFunction: (item) => ` <a
                          href='tel:${item}'
                          rel="noopener noreferrer"
                          target="_blank"
                          class='color-a'
                        >
                          +${item}
                        </a>`,
        },
        createdAt: {
            title: 'Дата',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },
        ownershipType: {
            title: 'Тип собственности',
            type: 'text',
            valuePrepareFunction: (value) => trEngToRusOwnerST(value),
        },
        partnerCategoryName: {
            title: 'Категория',
            type: 'text',
        },

        status: {
            title: 'Статус',
            type: 'custom',
            renderComponent: StatusBadgeComponent,
        },
        custom: {
            title: 'Детали',
            type: 'html',
            valuePrepareFunction: () => `<a
                          class='color-a increase-height'
                        >
                          Подробнее
                        </a>`,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private backendService: OldBackendService,
        private partnerIdentificationService: PartnerIdentificationService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getPartners(page = 1) {
        this.partnerIdentificationService
            .getListPartnerIdentification(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPartners = res));
    }
    getCategories(name = '') {
        this.backendService
            .getListCategories(name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.categories = data.items;
            });
    }
    changeType(type) {}

    detailPartner(data) {
        this.router.navigate([
            `catalog/partner-identification/detail/${data.id}`,
        ]);
    }
    rowSelect(id) {
        this.router.navigate([`catalog/partner-identification/detail/${id}`]);
    }
    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getPartners(1);
            });
        this.getPartners();
        this.getCategories();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
