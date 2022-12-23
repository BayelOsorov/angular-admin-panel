import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
} from '@angular/forms';
@Component({
    selector: 'ngx-credit-application-need-to-edit',
    templateUrl: './credit-application-need-to-edit.component.html',
    styleUrls: ['./credit-application-need-to-edit.component.scss'],
})
export class CreditApplicationNeedToEditComponent implements OnInit, OnDestroy {
    @Input() control: AbstractControl = new FormControl();

    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() mode = 'default';
    @Input() size = 'large';
    @Input() placeholder: string;
    @Input() data;

    constructor() {}
    onChange(val) {
        this.control.patchValue([val]);
    }
    ngOnInit(): void {}
    ngOnDestroy() {}
}
