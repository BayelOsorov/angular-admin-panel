import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'ngx-credit-application-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
})
export class CreditApplicationButtonsComponent implements OnInit {
    @Output() approveEvent = new EventEmitter();
    @Output() declineEvent = new EventEmitter();
    @Output() postponeEvent = new EventEmitter();

    visible = false;
    form;
    constructor(private fb: FormBuilder) {}
    approveUser() {
        this.approveEvent.emit();
    }
    postponeUser() {
        this.postponeEvent.emit();
    }
    declineUser() {
        this.declineEvent.emit(this.form.value);
    }
    onClick(): void {
        this.visible = true;
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            lockoutEnd: [null],
        });
    }
}
