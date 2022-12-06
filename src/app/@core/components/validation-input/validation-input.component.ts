import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-validation-input',
    templateUrl: './validation-input.component.html',
    styleUrls: ['./validation-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationInputComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() placeholder: string;
    @Input() type = 'input';

    @Input() submitted = false;
    constructor() {}

    ngOnInit(): void {}
}
