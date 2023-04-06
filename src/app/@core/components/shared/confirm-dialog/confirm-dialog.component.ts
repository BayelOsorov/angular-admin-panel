import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { log } from 'console';

@Component({
    selector: 'ngx-confirm-buttons',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
    @Output() approveEvent = new EventEmitter();
    @Input() control: AbstractControl = new FormControl();
    @Input() status = 'primary';
    @Input() title = 'подтвердите';
    @Input() textareaInclude = false;

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
