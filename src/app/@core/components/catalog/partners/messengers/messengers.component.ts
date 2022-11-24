import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
import { tableNumbering } from '../../../../utils';
import { MessengersActionsModalComponent } from './messengers-actions-modal/messengers-actions-modal.component';

@Component({
    selector: 'ngx-partner-messengers',
    templateUrl: './messengers.component.html',
    styleUrls: ['./messengers.component.scss'],
})
export class MessengersComponent implements OnInit, OnDestroy {
    @Input() partnerId: number;
    messengers;
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) => cell.row.index + 1,
        },
        type: {
            title: 'Тип',
            type: 'text',
        },
        name: {
            title: 'Название',
            type: 'text',
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private partnersService: PartnersService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.getMessengers();
    }
    getMessengers() {
        this.partnersService
            .getListPartnerMessengers(this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.messengers = {
                    items: res,
                    pageCount: 1,
                    totalItemCount: res.length,
                    page: 1,
                    pageSize: res.length,
                    hasPreviousPage: false,
                    hasNextPage: false,
                };
            });
    }
    deleteMessenger(id: number): void {
        this.partnersService
            .deletePartnerMessenger(this.partnerId, id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getMessengers();
            });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    public openCreateModal() {
        this.openModal(false, MessengersActionsModalComponent, {
            title: 'Добавление соцсети',
            context: { partnerId: this.partnerId },
        });
    }
    public openEditModal(data) {
        this.openModal(false, MessengersActionsModalComponent, {
            title: 'Редактирование соцсети',
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
                    (val === 'create' || val === 'edit') && this.getMessengers()
            );
    }
}
