import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-phone-number-input',
    templateUrl: './phone-number-input.component.html',
    styleUrls: ['./phone-number-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberInputComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() submitted = false;
    @Input() isRequired = true;
    constructor() {}
    handlePhone(num) {
        const txt = num.key;

        if ((txt.length === 12 || num.which === 32) && num.which !== 8) {
            num.preventDefault();
        }

        if (
            (this.control.value.length === 3 ||
                this.control.value.length === 6 ||
                this.control.value.length === 9) &&
            num.which !== 8
        ) {
            console.log();

            this.control.patchValue(this.control.value + ' ');
        }
    }
    ngOnInit(): void {}
}
