import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
    selector: 'ngx-update-amount',
    templateUrl: './update-amount.component.html',
    styleUrls: ['./update-amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAmountComponent implements OnInit {
    marks: NzMarks = {
        5000: '5000',
        6000: '6000',
        7000: '7000',
        8000: '8000',
        9000: '9000',
        10000: '10000',
        11000: '11000',
        12000: '12000',
        13000: '13000',
        14000: '14000',
        15000: '15000',
    };
    constructor() {}

    ngOnInit(): void {}
}
