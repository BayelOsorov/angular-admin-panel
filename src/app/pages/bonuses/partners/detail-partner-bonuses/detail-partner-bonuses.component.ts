import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreatePercentagePartnerComponent } from '../../../../@core/components/bonuses/partner-bonuses/create-percentage-partner/create-percentage-partner.component';
import { PartnerBonusesService } from '../../../../@core/services/bonuses/partner-bonuses.service';
import { tableNumbering } from '../../../../@core/utils';
@Component({
    templateUrl: './detail-partner-bonuses.component.html',
    styleUrls: ['./detail-partner-bonuses.component.scss'],
})
export class DetailPartnerBonusesComponent implements OnInit, OnDestroy {
    listPercentages;
    partnerId;
    partnerData;
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
                tableNumbering(this.listPercentages.pageNumber, cell.row.index),
        },
        value: {
            title: 'Проценты',
            type: 'text',
            valuePrepareFunction: (item) => item + ' %',
        },

        activeSince: {
            title: 'Действует с',
            type: 'text',
            valuePrepareFunction: (item) => this.parseDate(item),
        },

        isActive: {
            title: 'Активен',
            type: 'text',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerBonuses: PartnerBonusesService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder,
        private windowService: NbWindowService,
        private datePipe: DatePipe,
        private route: ActivatedRoute
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
    }
    getListPartnerPercentages(page = 1) {
        this.partnerBonuses
            .getListContractorsPercentages(page, this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listPercentages = res));
    }
    getDetailPartner(page = 1) {
        this.partnerBonuses
            .getDetailContractor(page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.partnerData = res));
    }
    deletePercentage(id) {
        this.partnerBonuses
            .deleteContractorPercentages(this.partnerId, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getListPartnerPercentages();
            });
    }

    public openCreateModal() {
        this.openModal(false, CreatePercentagePartnerComponent, {
            title: 'Изменение процента',
            context: {
                itemData: this.partnerData,
            },
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
                    this.getListPartnerPercentages()
            );
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.partnerId = params['id'];
            this.getDetailPartner(this.partnerId);
        });
        this.getListPartnerPercentages();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
