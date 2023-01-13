import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { maritalStatus } from '../../../utils';

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
    ngOnInit(): void {}
}
