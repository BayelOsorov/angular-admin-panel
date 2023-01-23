import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import {
    genderEnum,
    maritalStatus,
    residenceLocationEnum,
} from '../../../utils';

@Component({
    selector: 'ngx-passport-data',
    templateUrl: './passport-data.component.html',
    styleUrls: ['./passport-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportDataComponent implements OnInit {
    @Input() data;

    constructor() {}
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getGender(gender) {
        return genderEnum.find((e) => e.value === gender).text;
    }
    getResidenceLoc(loc) {
        return residenceLocationEnum.find((e) => e.value === loc)?.text;
    }
    ngOnInit(): void {}
}
