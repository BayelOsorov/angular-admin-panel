import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'ngx-confirm-buttons',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
    @Output() approveEvent = new EventEmitter();
    @Input() status = 'primary';
    @Input() title = 'подтвердите';

    visible: boolean;

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {
        this.visible = true;
    }
    approve() {
        this.approveEvent.emit('');
        this.visible = false;
    }
    decline() {
        this.visible = false;
    }
}
