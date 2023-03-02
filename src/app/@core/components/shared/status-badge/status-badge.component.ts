import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { getAlertStatus } from '../../../utils';
import { statusIdentificate } from '../../../utils/const';

@Component({
    selector: 'ngx-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent implements ViewCell, OnInit {
    @Input() value: string | number;
    @Input() rowData: any;
    renderValue: string | boolean;
    status: string;
    alertStatus;
    constructor() {}

    ngOnInit(): void {
        this.status = statusIdentificate?.find(
            (element) => element.id === this.value
        )?.text;

        this.renderValue = this.value.toString();
        this.alertStatus = getAlertStatus(this.renderValue);
    }
}
