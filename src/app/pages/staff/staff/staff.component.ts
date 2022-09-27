import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { elementAt } from 'rxjs/operators';
import { IStaff } from '../../../@core/models/staff/staff';
import { StaffService } from '../../../@core/services/staff/staff.service';

@Component({
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    listStaff: IStaff;
    settings = {
        hideSubHeader: true,
        delete: {
            deleteButtonContent: `<i class="nb-trash"></i>`,
            confirmDelete: true,
        },
        actions: {
            delete: true,
            edit: false,
            position: 'right',
        },
        pager: { perPage: 20 },
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
                valuePrepareFunction: (item) => this.getRoles(item),
            },
        },
    };
    constructor(private staffService: StaffService) {}

    ngOnInit(): void {
        this.subscription = this.staffService.getListStaff().subscribe({
            next: (data) => (this.listStaff = data),
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
            this.staffService.deleteStaff(event.data.id).subscribe({
                next: (data) => console.log(data),
            });
        } else {
            event.confirm.reject();
        }
    }
    getRoles(item) {
        return item.length > 1 ? item.map((elem) => elem.title) : item[0].title;
    }
}
