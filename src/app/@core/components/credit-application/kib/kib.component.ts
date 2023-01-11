import { Component, Input, OnInit } from '@angular/core';
import { NbMomentDateService } from '@nebular/moment';
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from '@nebular/theme';
import * as moment from 'moment';

@Component({
    selector: 'ngx-kib',
    templateUrl: './kib.component.html',
    styleUrls: ['./kib.component.scss'],
})
export class KibComponent implements OnInit {
    @Input() data;

    constructor() {}
    getUsedMoney(data) {
        let sum = 0;
        data.map((item) => {
            sum += item.amount;
        });
        return sum;
    }
    getOverdueDays(data) {
        const amount = data.amount;
        let repAmount = 0;
        let days;
        data.repayments.map((item) => {
            repAmount += item.amount;
        });

        if (amount > repAmount || data.repayments.length === 0) {
            const current_date = moment().format('YYYY-MM-DD');
            days = +moment(data.date)
                .add(-1, 'days')
                .diff(current_date, 'days')
                .toString()
                .substring(1);
        }

        return days ? days : false;
    }
    ngOnInit() {}
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
