import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { getProductCode } from '../../../utils';

@Component({
    selector: 'ngx-kib',
    templateUrl: './kib.component.html',
    styleUrls: ['./kib.component.scss'],
})
export class KibComponent implements OnInit {
    @Input() data;
    getProductCode = getProductCode;
    constructor() {}
    getUsedMoney(data) {
        let sum = 0;
        data.map((item) => {
            sum += item.amount;
        });
        return sum;
    }
    getOverdueDays(data) {
        const amount = data.amount;
        let repAmount = 0;
        let days;
        data.repayments.map((item) => {
            repAmount += item.amount;
        });

        if (amount > repAmount || data.repayments.length === 0) {
            const current_date = moment().format('YYYY-MM-DD');
            days = +moment(data.date)
                .add(-1, 'days')
                .diff(current_date, 'days')
                .toString()
                .substring(1);
        }

        return days ? days : false;
    }
    ngOnInit() {}
}
