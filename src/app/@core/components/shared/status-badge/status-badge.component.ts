import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { statusIdentificate } from '../../../utils/const';

@Component({
    selector: 'ngx-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent implements ViewCell, OnInit {
    @Input() value: string | number;
    @Input() rowData: any;
    renderValue: string;
    status: string;
    constructor() {}
    getStatus() {
        switch (this.renderValue) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'info';
            case 'Created':
                return 'info';
            case 'Declined':
                return 'danger';
            case 'NeedToEdit':
                return 'warning';
            case 'PhotosApproved':
                return 'primary';
            case 'Canceled':
                return 'secondary';
            case 'VideoIdentificationRequested':
                return 'primary';
            case 'InProcess':
                return 'primary';
            case 'EditRequired':
                return 'warning';
            case 'Timeout':
                return 'secondary';
            case 'Requested':
                return 'primary';
            default:
                return 'primary';
        }
    }
    ngOnInit(): void {
        this.status = statusIdentificate?.find(
            (element) => element.id === this.value
        )?.text;

        this.renderValue = this.value.toString();
    }
}
