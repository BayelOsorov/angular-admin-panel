import { DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { CustomDatePipe } from '../../../../@core/components/shared/date-pipe/date.pipe';
import { IPartnerIdentificationDetail } from '../../../../@core/models/catalog/partners';
import { PartnerIdentificationService } from '../../../../@core/services/catalog/partner-identification/partner-identification.service';

import { UsersService } from '../../../../@core/services/users/users.service';
import { trEngToRusOwnerST } from '../../../../@core/utils';
@Component({
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class PartnerIdentificationDetailComponent implements OnInit, OnDestroy {
    partner;
    partnerId: number;
    branches;
    customerData;
    form;
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
        private usersService: UsersService,
        private fb: FormBuilder,
        private datePipe: CustomDatePipe,
        private toaster: ToastrService,
        private location: Location,
        private route: ActivatedRoute
    ) {}
    parseDate(date) {
        return this.datePipe.transform(date, 'dd.MM.yyyy, HH:mm');
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
    getLogo(url) {
        return environment.baseUrl + url;
    }
    getDetailPartner() {
        this.partnerIdentificationService
            .getPartnerIdentificationDetail(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.partner = res;
                this.getUserCustomerData(res.clientId);

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
    getUserCustomerData(userId) {
        this.usersService
            .getDetailUser(userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: any) => {
                    this.customerData = data;
                },
            });
    }
    approvePartner() {
        this.partnerIdentificationService
            .approvePartnerIdentification(this.partnerId, {
                offerContent: this.form.value.comment,
            })
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
            .needToEditPartnerIdentification(this.partnerId, this.form.value)
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
        this.form = this.fb.group({
            comment: [''],
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
