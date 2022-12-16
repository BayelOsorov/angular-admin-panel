import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../../@core/components/shared/avatar-img/avatar-img.component';
import { IListMalls } from '../../../../@core/models/catalog/malls';
import { LocalitiesService } from '../../../../@core/services/catalog/localities/localities.service';
import { MallsService } from '../../../../@core/services/catalog/malls/malls.service';
import { tableNumbering } from '../../../../@core/utils';

@Component({
    templateUrl: './list-malls.component.html',
    styleUrls: ['./list-malls.component.scss'],
})
export class ListMallsComponent implements OnInit, OnDestroy {
    listMalls: IListMalls;
    localities = [];
    form = this.fb.group({
        name: [''],
        type: [''],
        localityId: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listMalls.page, cell.row.index),
        },
        logo: {
            title: 'Лого',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        name: { title: 'Название', type: 'text' },
        locality: {
            title: 'Населенный пункт',
            type: 'text',
            valuePrepareFunction: (value) => (value ? value.name.ru : ''),
        },
        workingHour: {
            title: 'Режим работы',
            type: 'text',
            valuePrepareFunction: (cell, item) =>
                item.workingHourStart + ' - ' + item.workingHourEnd,
        },
        isActive: {
            title: 'Активен',
            type: 'text',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
        order: { title: 'Порядок', type: 'text' },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private mallsService: MallsService,
        private localitiesService: LocalitiesService,
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    getMalls(page = 1, filter = {}) {
        this.mallsService
            .getListMalls(page, filter)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listMalls = res));
    }
    getLocalities(name = '') {
        this.localitiesService.getListLocalities(1, name).subscribe((data) => {
            this.localities = data.items;
        });
    }
    changeType(type) {
        console.log(type);
    }

    updateMall(data) {
        this.router.navigate([`catalog/malls/update/${data.id}`]);
    }

    deleteMall(id) {
        this.mallsService
            .deleteMall(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getMalls();
            });
    }

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getMalls(1, data);
            });
        this.getMalls();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
