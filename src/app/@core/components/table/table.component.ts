import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { IListBrand } from '../../models/catalog/brand';

@Component({
    selector: 'ngx-custom-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnChanges {
    @Input() tableColumns;
    @Input() tableData;
    settings = {};
    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.settings = {
            mode: 'external',
            hideSubHeader: true,
            delete: {
                deleteButtonContent: `<i class="nb-trash"></i>`,
                confirmDelete: false,
            },
            actions: {
                delete: true,
                edit: false,
                add: false,
                position: 'right',
                columnTitle: '',
            },
            pager: {
                perPage: 20,
                display: true,
            },
            columns: this.tableColumns,
        };
    }
    onDelete(event) {
        console.log(event);
    }
    onRowSelect(event) {
        console.log(event);
    }
    ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
            this.cd.detectChanges();
        }, 0);
    }
}
