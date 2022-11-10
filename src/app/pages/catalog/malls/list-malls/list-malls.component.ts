import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../../@core/components/avatar-img/avatar-img.component';
import { UseHttpImageSourcePipe } from '../../../../@core/components/secured-image/secured-image.component';
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
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listMalls.pageNumber, cell.row.index),
        },
        logo: {
            title: 'Лого',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        name: { title: 'Название', type: 'string' },
        localityId: { title: 'Населенный пункт', type: 'string' },
        workingHour: {
            title: 'Режим работы',
            type: 'text',
            valuePrepareFunction: (cell, item) =>
                item.workingHourStart + ' - ' + item.workingHourEnd,
        },
        isActive: {
            title: 'Активен',
            type: 'string',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
        order: { title: 'Порядок', type: 'string' },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private mallsService: MallsService,
        private localitiesService: LocalitiesService,
        private toaster: ToastrService,
        private router: Router
    ) {}
    getMalls(page = 1, name = '') {
        this.mallsService
            .getListMalls(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listMalls = res));
    }
    getLocalities(name = '') {
        this.localitiesService.getListLocalities(1, name).subscribe((data) => {
            this.localities = data.items;
        });
    }
    onSearch(event) {
        this.getMalls(1, event);
    }
    updateMall(data) {
        this.router.navigate([`catalog/malls/update/${data.id}`]);
    }
    userRowSelect(id) {
        this.router.navigate([`catalog/malls/detail/${id}`]);
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
        this.getMalls();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
