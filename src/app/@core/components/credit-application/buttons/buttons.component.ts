import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from '@angular/core';

@Component({
    selector: 'ngx-credit-application-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditApplicationButtonsComponent implements OnInit {
    @Output() approveEvent = new EventEmitter();
    @Output() declineEvent = new EventEmitter();
    constructor() {}
    approveUser() {
        this.approveEvent.emit();
    }
    declineUser() {
        this.declineEvent.emit();
    }
    ngOnInit(): void {}
}
