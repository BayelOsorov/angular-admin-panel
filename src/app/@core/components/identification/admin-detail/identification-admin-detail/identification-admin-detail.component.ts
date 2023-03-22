import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../../models/identification/identification';
import { IdentificationService } from '../../../../services/identification/identification.service';
import {
    genderEnum,
    getAlertStatus,
    maritalStatus,
    residenceLocationEnum,
} from '../../../../utils';
import { statusIdentificate } from '../../../../utils/const';

@Component({
    selector: 'ngx-identification-admin-detail',
    templateUrl: './identification-admin-detail.component.html',
    styleUrls: ['./identification-admin-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationAdminDetailComponent implements OnInit {
    @Input() data: IIdentificationDetail;
    @Input() personalData: IPersonalData;
    @Input() customerInfo;
    @Output() getDataEvent = new EventEmitter();
    alertStatus;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private identificationService: IdentificationService) {}
    sendComment(data) {
        this.identificationService
            .sendComment(this.data.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.getDataEvent.emit('');
                },
            });
    }
    getResidenceLoc(loc) {
        return residenceLocationEnum.find((e) => e.value === loc)?.text;
    }
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getGender(val) {
        return genderEnum.find((e) => e.value === val).text;
    }
    getStatus() {
        const { status } = this.data;

        this.alertStatus = {
            status: getAlertStatus(status),
            title: Boolean(this.data.videoIdentificationApprovedAt)
                ? 'Одобрена видеоидентификация'
                : statusIdentificate.find((element) => element.id === status)
                      ?.text,
        };
    }
    ngOnInit(): void {
        this.getStatus();
    }
}
