import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IListMalls } from '../../../../@core/models/catalog/malls';
import { MallsService } from '../../../../@core/services/catalog/malls/malls.service';

@Component({
    templateUrl: './list-malls.component.html',
    styleUrls: ['./list-malls.component.scss'],
})
export class ListMallsComponent implements OnInit, OnDestroy {
    listMalls: IListMalls;
    tableColumns = {
        id: { title: '№', type: 'number' },
        name: { title: 'Название', type: 'string' },
        categoryId: { title: 'Категория', type: 'number' },
        order: { title: 'Заказ', type: 'string' },
    };
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private mallsService: MallsService,
        private toaster: ToastrService,
        private router: Router
    ) {}
    getMalls(page = 1, name = '') {
        this.mallsService
            .getListMalls(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listMalls = res));
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
