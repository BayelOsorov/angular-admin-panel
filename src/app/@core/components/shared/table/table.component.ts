import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    AfterContentChecked,
    EventEmitter,
    Output,
} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { BrandsService } from '../../../services/catalog/brands/brands.service';

@Component({
    selector: 'ngx-custom-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterContentChecked {
    @Output() deleteItemEvent = new EventEmitter();
    @Output() openModalEvent = new EventEmitter();
    @Output() rowSelectEvent = new EventEmitter();
    @Output() changePageEvent = new EventEmitter();

    @Input() tableColumns;
    @Input() tableData;
    @Input() productName;
    @Input() delete = true;
    @Input() edit = true;

    @Input() actions = true;

    settings = {};
    constructor(
        private cd: ChangeDetectorRef,
        private windowService: NbWindowService,
        private brandService: BrandsService
    ) {}

    ngOnInit(): void {
        this.settings = {
            mode: 'external',
            hideSubHeader: true,
            delete: {
                deleteButtonContent: `<i class="nb-trash"></i>`,
                confirmDelete: false,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
            },

            actions: this.actions
                ? {
                      delete: this.delete,
                      edit: this.edit,
                      add: false,
                      position: 'right',
                      columnTitle: 'Опции',
                  }
                : false,
            pager: {
                perPage: 20,
                display: true,
            },

            // noDataMessage: 'Список пуст!',
            columns: this.tableColumns,
        };
    }
    onDelete(event) {
        this.deleteItemEvent.emit(
            this.productName === 'ни одного отзыва' ? event.data : event.data.id
        );
    }
    onRowSelect(event) {
        this.rowSelectEvent.emit(event.data.id);
    }
    onEdit(event) {
        this.openModalEvent.emit(event.data);
    }
    changePage(page) {
        this.changePageEvent.emit(page);
    }
    ngAfterContentChecked() {
        setTimeout(() => {
            this.cd.detectChanges();
        }, 0);
    }
}
