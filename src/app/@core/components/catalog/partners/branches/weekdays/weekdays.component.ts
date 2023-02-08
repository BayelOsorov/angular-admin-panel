import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-weekdays',
    templateUrl: './weekdays.component.html',
    styleUrls: ['./weekdays.component.scss'],
})
export class WeekdaysComponent implements OnInit {
    @Input() workingHourStart: AbstractControl = new FormControl();
    @Input() workingHourEnd: AbstractControl = new FormControl();
    @Input() lunchHourStart: AbstractControl = new FormControl();
    @Input() lunchHourEnd: AbstractControl = new FormControl();
    @Input() isWeekend: AbstractControl = new FormControl();

    @Input() weekDay: string;
    @Input() submitted = false;

    constructor() {}
    onChecked() {
        this.workingHourStart.setValue(null);
        this.workingHourEnd.setValue(null);
        this.lunchHourStart.setValue(null);
        this.lunchHourEnd.setValue(null);
    }
    changeMethod(val) {
        if (val) {
            this.onChecked();
        }
    }
    ngOnInit(): void {}
}
