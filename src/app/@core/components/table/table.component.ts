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
import { BrandsService } from '../../services/catalog/brands/brands.service';

@Component({
    selector: 'ngx-custom-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterContentChecked {
    @Output() deleteItemEvent = new EventEmitter<number>();
    @Output() openModalEvent = new EventEmitter<number>();

    @Input() tableColumns;
    @Input() tableData;

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
            actions: {
                delete: true,
                edit: true,
                add: false,
                position: 'right',
                columnTitle: '',
            },
            pager: {
                perPage: 20,
                display: true,
            },
            noDataMessage: 'Список пуст!',
            columns: this.tableColumns,
        };
    }
    onDelete(event) {
        this.deleteItemEvent.emit(event.data.id);
    }
    onRowSelect(event) {}
    onEdit(event) {
        this.openModalEvent.emit(event.data);
    }
    // ngAfterContentInit() {
    //     setTimeout(() => {
    //         this.cd.detectChanges();
    //     }, 0);
    // }
    ngAfterContentChecked() {
        setTimeout(() => {
            this.cd.detectChanges();
        }, 0);
    }
}
