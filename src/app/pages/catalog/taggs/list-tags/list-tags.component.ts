import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TagActionsModalComponent } from '../../../../@core/components/catalog/tag/tag-actions-modal/tag-actions-modal.component';
import { TagsService } from '../../../../@core/services/catalog/tags/tags.service';
import { tableNumbering } from '../../../../@core/utils';

@Component({
    templateUrl: './list-tags.component.html',
    styleUrls: ['./list-tags.component.scss'],
})
export class ListTagsComponent implements OnInit, OnDestroy {
    listTags;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listTags.pageNumber, cell.row.index),
        },
        name: {
            title: 'Название на RU',
            type: 'string',
            valuePrepareFunction: (item) => item.ru,
        },
        'name.kg': {
            title: 'Название на KG',
            type: 'string',
            valuePrepareFunction: (cell, row) => row.name.kg,
        },
        'name.uz': {
            title: 'Название на UZ',
            type: 'string',
            valuePrepareFunction: (cell, row) => row.name.uz,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private tagsService: TagsService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getTags();
    }
    getTags(page = 1, name = '') {
        this.tagsService
            .getListTags(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listTags = res));
    }
    deleteTag(id: number): void {
        this.tagsService
            .deleteTag(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getTags();
            });
    }
    onSearch(event) {
        this.getTags(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, TagActionsModalComponent, {
            title: 'Добавление тега',
            context: {},
        });
    }
    public openEditModal(data) {
        this.openModal(false, TagActionsModalComponent, {
            title: 'Редактирование тега',
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
                (val) => (val === 'create' || val === 'edit') && this.getTags()
            );
    }
}
