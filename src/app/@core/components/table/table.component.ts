import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
    AfterContentChecked,
    AfterViewChecked,
    AfterContentInit,
    AfterViewInit,
} from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { IListBrand } from '../../models/catalog/brand';

@Component({
    selector: 'ngx-custom-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterContentChecked {
    @Input() tableColumns;
    @Input() tableData;
    @Input() openEditModal: (any) => void;

    settings = {};
    constructor(
        private cd: ChangeDetectorRef,
        private windowService: NbWindowService
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
            columns: this.tableColumns,
        };
    }
    onDelete(event) {}
    onRowSelect(event) {}
    onEdit(event) {
        this.openEditModal(event.data);
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
