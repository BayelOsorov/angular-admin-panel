import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { elementAt } from 'rxjs/operators';
import { IListStaff } from '../../../@core/models/staff/staff';
import { StaffService } from '../../../@core/services/staff/staff.service';

@Component({
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    listStaff: IListStaff;
    settings = {
        hideSubHeader: false,
        delete: {
            deleteButtonContent: `<i class="nb-trash"></i>`,
            confirmDelete: true,
        },
        actions: {
            delete: true,
            edit: false,
            add: false,
            position: 'right',
            columnTitle: '',
        },
        pager: {
            perPage: 5,
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
    constructor(private staffService: StaffService, private router: Router) {}

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
    onUserRowSelect(event): void {
        this.router.navigate([`staff-detail/${event.data.id}`]);
        console.log(event);
    }
    getRoles(item) {
        return item.length > 1 ? item.map((elem) => elem.title) : item[0].title;
    }
}
