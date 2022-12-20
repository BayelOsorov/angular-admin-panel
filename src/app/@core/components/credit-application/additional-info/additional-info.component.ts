import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {
    Position,
    entrepreneurTypeEnum,
    residenceLocationEnum,
    genderEnum,
    workExperience,
    clientHistoryTypeValue,
    locationMonth,
    dependentsCount,
    maritalStatus,
    placeOfWorkType,
} from '../../../utils';
@Component({
    selector: 'ngx-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrls: ['./additional-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnInit {
    @Input() data;
    work;
    constructor() {}

    getWorkType() {
        return placeOfWorkType.find(
            (item) => item.value.toLowerCase() === this.work.$type.toLowerCase()
        )?.text;
    }
    getWorkExp() {
        return workExperience.find(
            (item) => item.value === this.work.workExperience
        ).text;
    }
    getActivityType() {
        return entrepreneurTypeEnum.find((e) => e.value === this.work.type)
            .text;
    }
    ngOnInit(): void {
        if (this.data) {
            this.work = this.data.customerData.occupation;
        }
    }
}
