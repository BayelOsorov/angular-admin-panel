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
    columns: [
        {
            name: 'productCode';
            header: 'Название';
        },
        {
            name: 'limit';
            header: 'Лимит';
        }
    ];
    data = [
        {
            data: {
                id: '444e53e1-4e99-4496-a062-d58374cbf45d',
                createdAt: '2023-01-05T09:47:29.55643Z',
                productCode: 'Charmander',
                currency: 'Kgs',
                limit: 10000.0,
            },
            children: [
                {
                    data: {
                        id: 'd15b66e5-d9d1-42ef-995b-4e5ff0f29b04',
                        createdAt: '2023-01-05T09:53:20.389453Z',
                        amount: 1000.0,
                        contractorId: 1,
                        contractorName: 'Sample Contractor Name',
                        description: 'Sample text',
                        repaymentDates: [
                            {
                                id: '70391077-fed9-4680-a097-11a3913db447',
                                createdAt: '2023-01-05T09:53:20.38962Z',
                                amount: 500.0,
                                date: '2023-01-09T00:00:00Z',
                                repayments: [],
                                data: {},
                            },
                            {
                                id: '8932b20f-d7e6-48a9-b011-e5b0ffb29bed',
                                createdAt: '2023-01-05T09:53:20.389466Z',
                                amount: 500.0,
                                date: '2023-01-04T00:00:00Z',
                                repayments: [],
                                data: {},
                            },
                        ],
                    },
                },
            ],
        },
    ];
    // data = [
    //     {
    //         id: '444e53e1-4e99-4496-a062-d58374cbf45d',
    //         createdAt: '2023-01-05T09:47:29.55643Z',
    //         productCode: 'Charmander',
    //         currency: 'Kgs',
    //         limit: 10000.0,
    //         activeContracts: [
    //             {
    //                 id: 'd15b66e5-d9d1-42ef-995b-4e5ff0f29b04',
    //                 createdAt: '2023-01-05T09:53:20.389453Z',
    //                 amount: 1000.0,
    //                 contractorId: 1,
    //                 contractorName: 'Sample Contractor Name',
    //                 description: 'Sample text',
    //                 repaymentDates: [
    //                     {
    //                         id: '70391077-fed9-4680-a097-11a3913db447',
    //                         createdAt: '2023-01-05T09:53:20.38962Z',
    //                         amount: 500.0,
    //                         date: '2023-01-09T00:00:00Z',
    //                         repayments: [],
    //                         data: {},
    //                     },
    //                     {
    //                         id: '8932b20f-d7e6-48a9-b011-e5b0ffb29bed',
    //                         createdAt: '2023-01-05T09:53:20.389466Z',
    //                         amount: 500.0,
    //                         date: '2023-01-04T00:00:00Z',
    //                         repayments: [],
    //                         data: {},
    //                     },
    //                 ],
    //                 data: {},
    //             },
    //         ],
    //         data: {
    //             RepaymentDay: '12',
    //         },
    //     },
    // ];
    // data: TreeNode<FSEntry>[] = [
    //     {
    //         data: {
    //             name: 'Руслан Шоп',
    //             size: '1.12.2022',
    //             used: '6000',
    //             items: 5,
    //             kind: 'dir',
    //         },
    //         children: [
    //             {
    //                 data: {
    //                     name: '1-й платеж',
    //                     kind: 'dir',
    //                     size: '2.12.2022',
    //                     used: '1000',
    //                 },
    //                 children: [
    //                     {
    //                         data: {
    //                             name: '1.12.2022',
    //                             kind: 'dir',
    //                             size: '',
    //                             used: '3000',
    //                         },
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // ];
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
