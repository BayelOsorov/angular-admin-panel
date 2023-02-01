import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-phone-number-input',
    templateUrl: './phone-number-input.component.html',
    styleUrls: ['./phone-number-input.component.scss'],
})
export class PhoneNumberInputComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() submitted = false;
    @Input() isRequired = true;
    @ViewChild('input') input: ElementRef;
    value = '';
    maxLength = 9;
    constructor() {}

    onChange(val) {
        const newVal = val
            .replace(/^0+/, '')
            .replaceAll('-', '')
            .replaceAll('.', '')
            .replace('+996', '')
            .replaceAll(' ', '')
            .replaceAll('‒', '');

        if (newVal.length === 9) {
            const phone = this.numberWithSpaces(newVal, '### ## ## ##');
            this.value = phone;
            this.control.setValue(newVal);
            this.maxLength = 12;
        } else {
            this.maxLength = 20;
        }
        if (this.control.value.length === 9) {
            this.control.patchValue('+996' + this.control.value);
        }
    }
    numberWithSpaces(value, pattern) {
        let i = 0;
        const phone = value.toString().replace(/\D/gm, '');
        if (phone.length < 9) {
            return phone;
        }

        return pattern.replace(/#/g, (_) => phone[i++]);
    }

    ngOnInit(): void {
        this.control.valueChanges.subscribe((val: string) => {
            if (val.includes('+996') && !this.value) {
                this.onChange(val);
                this.input.nativeElement.focus();
                this.input.nativeElement.blur();
            }
        });
    }
}
