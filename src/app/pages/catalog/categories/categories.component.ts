import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvatarImgComponent } from '../../../@core/components/avatar-img/avatar-img.component';
import { IListCategories } from '../../../@core/models/catalog/category';
import { CategoriesService } from '../../../@core/services/catalog/categories/categories.service';
import { tableNumbering } from '../../../@core/utils';

@Component({
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
    listCategory: IListCategories;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listCategory.page, cell.row.index),
        },
        logo: {
            title: 'Лого',
            type: 'custom',
            renderComponent: AvatarImgComponent,
        },
        name: {
            title: 'Название',
            type: 'html',
            valuePrepareFunction: (cell, item) =>
                this.domSanitizer.bypassSecurityTrustHtml(
                    item.parentId
                        ? item.parentName + ` - ` + item.name
                        : item.name
                ),
        },
        backgroundColor: {
            title: 'Цвет фона',
            type: 'html',
            valuePrepareFunction: (item) =>
                this.domSanitizer.bypassSecurityTrustHtml(
                    `<div class="row" style='background-color: ${item}; height:43px;'>&nbsp; </div>`
                ),
        },
        isActive: {
            title: 'Активен',
            type: 'text',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
        order: {
            title: 'Порядок',
            type: 'text',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private categoryService: CategoriesService,
        private toaster: ToastrService,
        private domSanitizer: DomSanitizer,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.getCategories();
    }
    getCategories(page = 1, name = '') {
        this.categoryService
            .getListCategories(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listCategory = res));
    }
    deleteCategory(id: number): void {
        this.categoryService
            .deleteCategory(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getCategories();
            });
    }
    onSearch(event) {
        this.getCategories(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openEdit(data) {
        this.router.navigate([`catalog/categories/update/${data.id}`]);
    }
}
