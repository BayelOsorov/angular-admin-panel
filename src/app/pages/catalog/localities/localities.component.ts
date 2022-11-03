import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalityActionsModalComponent } from '../../../@core/components/catalog/locality/locality-actions-modal/locality-actions-modal.component';
import { LocalitiesService } from '../../../@core/services/catalog/localities/localities.service';
@Component({
    templateUrl: './localities.component.html',
    styleUrls: ['./localities.component.scss'],
})
export class LocalitiesComponent implements OnInit, OnDestroy {
    listLocalities;
    tableColumns = {
        id: {
            title: '№',
            type: 'number',
        },
        name: {
            title: 'Название',
            type: 'string',
            valuePrepareFunction: (item) => item.ru,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private localityService: LocalitiesService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getLocalities();
    }
    getLocalities(page = 1, name = '') {
        this.localityService
            .getListLocalities(page, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listLocalities = res));
    }
    deleteLocality(id: number): void {
        this.localityService
            .deleteLocality(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getLocalities();
            });
    }
    onSearch(event) {
        this.getLocalities(1, event);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, LocalityActionsModalComponent, {
            title: 'Добавление тега',
            context: {},
        });
    }
    public openEditModal(data) {
        this.openModal(false, LocalityActionsModalComponent, {
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
                (val) =>
                    (val === 'create' || val === 'edit') && this.getLocalities()
            );
    }
}
