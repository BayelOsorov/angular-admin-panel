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
        1: '5000',
        26: '26°C',
        37: '37°C',
        1000: {
            style: {
                color: '#f50',
            },
            label: '<strong>100°C</strong>',
        },
    };
    constructor() {}

    ngOnInit(): void {}
}
