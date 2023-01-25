import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    @Output() sendVideoEvent = new EventEmitter();

    @Input() openvidu;

    @Input() data: IIdentificationDetail;
    form: FormGroup;
    videoFormData;
    constructor(private fb: FormBuilder) {}
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
    sendVideo() {}
    onFileChange(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('callVideoFile', file);
        this.videoFormData = formData;
    }
    onSubmit() {
        this.sendVideoEvent.emit(this.videoFormData);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            video: ['', Validators.required],
        });
    }
}
