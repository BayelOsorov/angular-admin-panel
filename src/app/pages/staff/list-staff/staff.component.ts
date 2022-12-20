import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateStaffModalComponent } from '../../../@core/components/staff/create-staff-modal/create-staff-modal/create-staff-modal.component';
import { IListStaff } from '../../../@core/models/staff/staff';
import { StaffService } from '../../../@core/services/staff/staff.service';
import { tableNumbering } from '../../../@core/utils';
@Component({
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    listStaff: IListStaff;
    visible: boolean;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listStaff.pageNumber, cell.row.index),
        },

        name: {
            title: 'ФИО',
            type: 'html',
        },

        userName: {
            title: 'Логин',
            type: 'text',
        },
        roles: {
            title: 'Роль',
            type: 'text',
            valuePrepareFunction: (value) => this.getRoles(value),
        },
    };
    constructor(
        private staffService: StaffService,
        private router: Router,
        public windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getListStaff();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    getListStaff(page = 1, name = '') {
        this.subscription = this.staffService
            .getListStaff(page, name)
            .subscribe({
                next: (data) => (this.listStaff = data),
            });
    }
    onSearch(name) {
        this.getListStaff(1, name);
    }
    onDelete(id): void {
        this.staffService.deleteStaff(id).subscribe({
            next: () => {
                this.toaster.success('Успешно удалено!');
                this.getListStaff(1);
            },
        });
    }
    openEdit(data) {
        this.router.navigate([`staff-detail/${data.id}`]);
    }

    getRoles(item) {
        return item.length > 1
            ? item.map((elem) => ' ' + elem.title)
            : item[0].title;
    }
    openCreateModal() {
        this.openModal(false, CreateStaffModalComponent, {
            title: 'Добавление сотрудника',
            context: {},
        });
    }
    openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) => val === 'create' && this.getListStaff()
            );
    }
}
