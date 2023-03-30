import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusBadgeComponent } from '../../../@core/components/shared/status-badge/status-badge.component';
import { UsersService } from '../../../@core/services/users/users.service';
import { tableNumbering } from '../../../@core/utils';
@Component({
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
    listUsers;
    form = this.fb.group({
        name: [''],
        surname: [''],
        patronymic: [''],
        status: [''],
        phone: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listUsers.pageNumber, cell.row.index),
        },

        identificationInformation: {
            title: 'ФИО',
            type: 'text',
            valuePrepareFunction: (item) =>
                item
                    ? item.surname + ' ' + item.name + ' ' + item.patronymic
                    : 'Нет данных',
        },
        phoneNumber: {
            title: 'Номер телефона',
            type: 'html',
            valuePrepareFunction: (item) => ` <a
                          href='tel:${item}'
                          rel="noopener noreferrer"
                          target="_blank"
                          class='color-a'
                        >
                          +${item}
                        </a>`,
        },
        identificationLevel: {
            title: 'Статус',
            type: 'custom',
            renderComponent: StatusBadgeComponent,
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
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private usersService: UsersService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    getListUsers(page = 1) {
        const { name, surname, patronymic, phone } = this.form.value;
        if (name || surname || patronymic || phone) {
            this.usersService
                .getListUsers(page, this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => (this.listUsers = res));
            return;
        }
        this.listUsers = {
            items: [],
            pageCount: 0,
            totalItemCount: 0,
            pageNumber: 1,
            pageSize: 20,
            hasPreviousPage: false,
            hasNextPage: false,
        };
    }
    getDetailUser(id) {
        this.router.navigate([`users/detail/${id}`]);
    }

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getListUsers(1);
            });
        this.getListUsers();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
