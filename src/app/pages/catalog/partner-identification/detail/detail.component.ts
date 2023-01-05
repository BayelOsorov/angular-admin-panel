import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPartnerIdentificationDetail } from '../../../../@core/models/catalog/partners';
import { PartnerIdentificationService } from '../../../../@core/services/catalog/partner-identification/partner-identification.service';
import { trEngToRusOwnerST } from '../../../../@core/utils';
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class PartnerIdentificationDetailComponent implements OnInit, OnDestroy {
    partner: IPartnerIdentificationDetail;
    partnerId: number;
    branches;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) => cell.row.index + 1,
        },
        name: {
            title: 'Название',
            type: 'text',
        },
        address: {
            title: 'Адрес',
            type: 'text',
        },
        workingHourStart: {
            title: 'Время открытия',
            type: 'text',
        },
        workingHourEnd: {
            title: 'Время закрытия',
            type: 'text',
        },
        localityName: {
            title: 'Населенный пункт',
            type: 'text',
            valuePrepareFunction: (item) => item.localizations[1]?.value,
        },
        mallName: {
            title: 'Торговый центр',
            type: 'text',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnerIdentificationService: PartnerIdentificationService,
        private datePipe: DatePipe,
        private toaster: ToastrService,
        private location: Location,
        private route: ActivatedRoute
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, hh:mm');
    }
    translateOwnerShipType(type) {
        return trEngToRusOwnerST(type);
    }
    translateRequisiteType = (val) => {
        switch (val) {
            case 'ElsomWallet':
                return 'Элсом';
            case 'Bank':
                return 'Банк';

            default:
                return val;
        }
    };
    getDetailPartner() {
        this.partnerIdentificationService
            .getPartnerIdentificationDetail(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.partner = res;
                this.branches = {
                    items: res.branches,
                    pageCount: 1,
                    totalItemCount: res.branches.length,
                    page: 1,
                    pageSize: res.branches.length,
                    hasPreviousPage: false,
                    hasNextPage: false,
                };
            });
    }
    approvePartner() {
        this.partnerIdentificationService
            .approvePartnerIdentification(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно сделали предложение!');
                this.location.back();
            });
    }
    declinePartner() {
        this.partnerIdentificationService
            .declinePartnerIdentification(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно отклонили!');
                this.location.back();
            });
    }
    needToEditPartner() {
        this.partnerIdentificationService
            .approvePartnerIdentification(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно отправили на редактирование!');
                this.location.back();
            });
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.partnerId = params['id'];
        });
        this.getDetailPartner();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
