import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateStaffModalComponent } from '../../../@core/components/staff/create-staff-modal/create-staff-modal/create-staff-modal.component';
import { IListStaff } from '../../../@core/models/staff/staff';
import { StaffService } from '../../../@core/services/staff/staff.service';
@Component({
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    listStaff: IListStaff;
    visible: boolean;

    settings = {
        mode: 'external',
        hideSubHeader: false,
        delete: {
            deleteButtonContent: `<i class="nb-trash"></i>`,
            confirmDelete: false,
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        actions: {
            delete: true,
            edit: false,
            add: false,
            position: 'right',
            columnTitle: '',
        },
        pager: {
            perPage: 20,
            display: true,
        },
        columns: {
            name: {
                title: 'ФИО',
                type: 'string',
                editable: false,
            },
            userName: {
                title: 'Логин',
                type: 'string',
            },
            roles: {
                title: 'Роль',
                type: 'text',
                // width: '10%',
                filter: false,
                valuePrepareFunction: (item) => this.getRoles(item),
            },
        },
    };

    constructor(
        private staffService: StaffService,
        private router: Router,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getListStaff();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    getListStaff(page = 1) {
        this.subscription = this.staffService.getListStaff(page).subscribe({
            next: (data) => (this.listStaff = data),
        });
    }

    onDeleteConfirm(event): void {
        this.staffService.deleteStaff(event.data.id).subscribe({
            next: (data) => {
                this.toaster.success('Успешно удалено!');
                this.getListStaff(1);
            },
        });
    }
    onUserRowSelect(event): void {
        this.router.navigate([`staff-detail/${event.data.id}`]);
    }
    getRoles(item) {
        return item.length > 1 ? item.map((elem) => elem.title) : item[0].title;
    }
    openCreateModal() {
        this.openModal(false, CreateStaffModalComponent, {
            title: 'Добавление сотрудника',
            context: {},
        });
    }
    changePage(e) {
        this.getListStaff(e);
    }

    protected openModal(closeOnBackdropClick: boolean, component, props) {
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
