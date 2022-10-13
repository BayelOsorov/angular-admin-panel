import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
    visible: boolean;
    constructor() {}

    ngOnInit(): void {}
    clickMe(): void {
        this.visible = false;
    }

    change(value: boolean): void {
        console.log(value);
    }
}
