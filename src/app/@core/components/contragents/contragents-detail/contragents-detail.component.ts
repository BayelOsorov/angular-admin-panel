import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnDestroy,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { NbWindowService } from '@nebular/theme';
import { LegalContractorBeneficiaryActionsComponent } from '../beneficiares/legal-contractor-beneficiary-actions/legal-contractor-beneficiary-actions.component';
import { LegalContragentActionsModalComponent } from '../employees/legal-contragent-actions-modal/legal-contragent-actions-modal.component';
import { LegalContractorsService } from '../../../services/contragents/legal-contractors.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
    selector: 'ngx-contragents-detail',
    templateUrl: './contragents-detail.component.html',
    styleUrls: ['./contragents-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContragentsDetailComponent implements OnInit, OnDestroy {
    @Input() data;
    @Input() contractorId;

    employees;
    beneficiaries;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private windowService: NbWindowService,
        private toaster: ToastrService,
        private location: Location,
        private legalContractorsService: LegalContractorsService,
        private router: Router
    ) {}
    getEmployees() {
        this.legalContractorsService
            .getLegalContractorEmployeesList(this.contractorId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.employees = {
                    items: res,
                    pageCount: 1,
                    totalItemCount: res.length,
                    page: 1,
                    pageSize: res.length,
                    hasPreviousPage: false,
                    hasNextPage: false,
                };
            });
    }
    deleteEmployee(id) {
        this.legalContractorsService
            .deleteLegalContractorEmployee(this.contractorId, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getEmployees();
            });
    }

    public openCreateModal() {
        this.openModal(false, LegalContragentActionsModalComponent, {
            title: 'Добавление сотрудника',
            context: { contractorId: this.data.id },
        });
    }
    public openEditModal(data) {
        this.openModal(false, LegalContragentActionsModalComponent, {
            title: 'Редактирование сотрудника',
            context: { itemData: data, contractorId: this.data.id },
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
                    (val === 'create' || val === 'edit') && this.getEmployees()
            );
    }

    getBeneficiares() {
        this.legalContractorsService
            .getLegalContractorBeneficiariesList(this.contractorId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.beneficiaries = {
                    items: res,
                    pageCount: 1,
                    totalItemCount: res.length,
                    page: 1,
                    pageSize: res.length,
                    hasPreviousPage: false,
                    hasNextPage: false,
                };
            });
    }
    deleteBeneficiary(id) {
        this.legalContractorsService
            .deleteLegalContractorBeneficiary(this.contractorId, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getBeneficiares();
            });
    }
    editBeneficiary(data) {
        this.router.navigate([
            `contragents/legal-contractors/detail/${this.contractorId}/beneficiaries/update/${data.id}`,
        ]);
    }
    createBeneficiary() {
        this.router.navigate([
            `contragents/legal-contractors/detail/${this.contractorId}/beneficiaries/create`,
        ]);
    }
    updateContragent() {
        this.router.navigate([
            `contragents/legal-contractors/update/${this.contractorId}`,
        ]);
    }
    deleteContragent() {
        this.legalContractorsService
            .deleteLegalContractor(this.contractorId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.location.back();
            });
    }
    ngOnInit(): void {
        this.getEmployees();
        this.getBeneficiares();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
