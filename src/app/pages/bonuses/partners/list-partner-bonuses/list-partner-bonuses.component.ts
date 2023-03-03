import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
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
    contractorPartners;
    form = this.fb.group({
        externalId: [''],
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
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getPartners(val) {
        this.oldBackService
            .getListPartners(val)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                this.contractorPartners = res.items;
            });
    }
    getListPartners(page = 1) {
        this.partnerBonuses
            .getListContractors(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                if (res.items.length > 0) {
                    const newPartners = [];
                    let partnerCount = 0;
                    res.items.forEach((item) => {
                        this.oldBackService
                            .getDetailPartner(item.externalId)
                            .pipe(
                                takeUntil(this.destroy$),
                                catchError((error: any) => of(null))
                            )
                            .subscribe((partner: any) => {
                                partnerCount++;
                                if (partner) {
                                    newPartners.push({
                                        ...item,
                                        name: partner.name,
                                    });
                                }
                                if (partnerCount === res.items.length) {
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
        this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.getListPartners();
        });
        this.getListPartners();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
