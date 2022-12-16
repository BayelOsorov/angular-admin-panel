import { Component, Input, OnInit } from '@angular/core';
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from '@nebular/theme';

interface TreeNode<T> {
    data: T;
    children?: TreeNode<T>[];
    expanded?: boolean;
}

interface FSEntry {
    name: string;
    size: string;
    used: string;
    kind: string;
    items?: number;
}

@Component({
    selector: 'ngx-kib',
    templateUrl: './kib.component.html',
    styleUrls: ['./kib.component.scss'],
})
export class KibComponent {
    customColumn = 'name';
    defaultColumns = ['size', 'used'];
    allColumns = [this.customColumn, ...this.defaultColumns];

    data: TreeNode<FSEntry>[] = [
        {
            data: {
                name: 'Руслан Шоп',
                size: '1.12.2022',
                used: '6000',
                items: 5,
                kind: 'dir',
            },
            children: [
                {
                    data: {
                        name: '1-й платеж',
                        kind: 'dir',
                        size: '2.12.2022',
                        used: '1000',
                    },
                    children: [
                        {
                            data: {
                                name: '1.12.2022',
                                kind: 'dir',
                                size: '',
                                used: '3000',
                            },
                        },
                    ],
                },
            ],
        },
    ];
}

@Component({
    selector: 'ngx-fs-icon',
    template: `
        <nb-tree-grid-row-toggle
            [expanded]="expanded"
            *ngIf="isDir(); else fileIcon"
        >
        </nb-tree-grid-row-toggle>
        <ng-template #fileIcon>
            <nb-icon icon="file-text-outline"></nb-icon>
        </ng-template>
    `,
})
export class FsIconComponent {
    @Input() kind: string;
    @Input() expanded: boolean;

    isDir(): boolean {
        return this.kind === 'dir';
    }
}
