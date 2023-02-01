import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    Output,
    EventEmitter,
} from '@angular/core';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
    selector: 'ngx-update-amount',
    templateUrl: './update-amount.component.html',
    styleUrls: ['./update-amount.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateAmountComponent implements OnInit, OnChanges {
    @Output() changeAmountEvent = new EventEmitter();
    @Input() data;
    btnDisabled = false;
    requestingAmount;
    marks: NzMarks = {
        1000: '1000',
        2000: '2000',
        3000: '3000',
        4000: '4000',
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
        16000: '16000',
        17000: '17000',
        18000: '18000',
        19000: '19000',
        20000: '20000',
        21000: '21000',
        22000: '22000',
        23000: '23000',
        24000: '24000',
        25000: '25000',
        26000: '26000',
        27000: '27000',
        28000: '28000',
        29000: '29000',
        30000: '30000',
    };
    constructor() {}
    onChange(val) {
        this.btnDisabled = false;
        this.requestingAmount = val;
    }
    updateAmount() {
        this.btnDisabled = true;
        this.changeAmountEvent.emit(this.requestingAmount);
    }
    ngOnChanges(): void {
        if (this.data) {
            this.requestingAmount = this.data.requestingAmount;
        }
    }
    ngOnInit(): void {}
}
