import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryActionsModalComponent } from '../../../@core/components/catalog/category/category-actions-modal/category-actions-modal.component';
import { UseHttpImageSourcePipe } from '../../../@core/components/secured-image/secured-image.component';
import { IListCategories } from '../../../@core/models/catalog/category';
import { CategoriesService } from '../../../@core/services/catalog/categories/categories.service';

@Component({
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
    listCategory: IListCategories;
    tableColumns = {
        id: {
            title: '№',
            type: 'number',
        },
        logo: {
            title: 'Лого',
            type: 'html',
            valuePrepareFunction: (item) =>
                `<img width='43' height='43' class="bg-info rounded-circle" src="${this.getImgSrc(
                    item
                )}" />`,
        },
        name: {
            title: 'Название',
            type: 'string',
        },
        backgroundColor: {
            title: 'Цвет фона',
            type: 'html',
            valuePrepareFunction: (item) =>
                this.domSanitizer.bypassSecurityTrustHtml(
                    `<div class="row">&nbsp; <div class="colorSpan mx-auto" style='background-color: ${item};width:30px'></div> </div>`
                ),
        },
        isActive: {
            title: 'Активен',
            type: 'string',
            valuePrepareFunction: (bool) => (bool ? 'Да' : 'Нет'),
        },
        order: {
            title: 'Порядок',
            type: 'string',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private categoryService: CategoriesService,
        private windowService: NbWindowService,
        private toaster: ToastrService,
        private domSanitizer: DomSanitizer,
        private httpImgSrc: UseHttpImageSourcePipe
    ) {}
    getImgSrc(imagePath: string): string | SafeUrl {
        return this.httpImgSrc.transform(imagePath);
    }
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
    public openCreateModal() {
        this.openModal(false, CategoryActionsModalComponent, {
            title: 'Добавление категории',
            context: {},
        });
    }
    public openEditModal(data) {
        this.openModal(false, CategoryActionsModalComponent, {
            title: 'Редактирование категории',
            context: { itemData: data },
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
                    (val === 'create' || val === 'edit') && this.getCategories()
            );
    }
}
