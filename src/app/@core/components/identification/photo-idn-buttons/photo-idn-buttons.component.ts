import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import { IIdentificationDetail } from '../../../models/identification/identification';

@Component({
    selector: 'ngx-photo-idn-buttons',
    templateUrl: './photo-idn-buttons.component.html',
    styleUrls: ['./photo-idn-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIdnButtonsComponent implements OnInit {
    @Output() approveEvent = new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Output() declineEvent = new EventEmitter();
    @Input() isPhotoIdnNeedToEdit: boolean;
    @Input() isInfoOpened: boolean;
    @Input() openvidu;

    @Input() data: IIdentificationDetail;

    constructor() {}
    declineUser() {
        this.declineEvent.emit();
    }
    approveUser() {
        this.approveEvent.emit();
    }
    editUser() {
        this.editEvent.emit();
    }
    startVideo() {
        this.openvidu.joinSession();
    }
    ngOnInit(): void {}
}
