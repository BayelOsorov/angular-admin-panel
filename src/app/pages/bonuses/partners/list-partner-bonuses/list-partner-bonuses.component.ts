import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, map as mapRx, takeUntil } from 'rxjs/operators';
import { CreatePartnerBonuseComponent } from '../../../../@core/components/bonuses/partner-bonuses/create-partner/create-partner-bonuse.component';
import { PartnerBonusesService } from '../../../../@core/services/bonuses/partner-bonuses.service';
import { OldBackendService } from '../../../../@core/services/old-backend/old-backend.service';
import { tableNumbering } from '../../../../@core/utils';

@Component({
    templateUrl: './list-partner-bonuses.component.html',
    styleUrls: ['./list-partner-bonuses.component.scss'],
})
export class ListPartnerBonusesComponent implements OnInit, OnDestroy {
    listPartners;

    form = this.fb.group({
        name: [''],
        surname: [''],
        patronymic: [''],
        status: ['None'],
        phone: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listPartners.pageNumber, cell.row.index),
        },

        name: { title: 'Название партнера', type: 'text' },
        createdAt: {
            title: 'Дата создания',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },

        custom: {
            title: 'Детали',
            type: 'html',
            valuePrepareFunction: () => ` <a
                          class='color-a increase-height'
                        >
                          Подробнее
                        </a>`,
        },
        // identificationLevel: {
        //     title: 'Статус',
        //     type: 'text',
        //     valuePrepareFunction: (status) =>
        //         translateIdentificationLevels(status),
        // },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerBonuses: PartnerBonusesService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private windowService: NbWindowService,
        private datePipe: DatePipe,
        private oldBackService: OldBackendService
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, hh:mm');
    }
    getListPartners(page = 1) {
        this.partnerBonuses
            .getListContractors(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res.items.length > 0) {
                    const newPartners = [];
                    res.items.forEach((item) => {
                        this.oldBackService
                            .getDetailPartner(item.externalId)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe((partner: any) => {
                                newPartners.push({
                                    ...item,
                                    name: partner.name,
                                });
                                if (res.items.length === newPartners.length) {
                                    this.listPartners = {
                                        ...res,
                                        items: newPartners,
                                    };
                                }
                            });
                    });
                }
            });
    }
    deletePartner(id) {
        this.partnerBonuses
            .deleteContractor(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getListPartners();
            });
    }

    getDetail(id) {
        this.router.navigate([`/bonuses/partners/detail/${id}`]);
    }
    public openCreateModal() {
        this.openModal(false, CreatePartnerBonuseComponent, {
            title: 'Добавление партнера',
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
                    this.getListPartners()
            );
    }
    ngOnInit(): void {
        this.getListPartners();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
