import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-localization-inputs',
    templateUrl: './localization-inputs.component.html',
    styleUrls: ['./localization-inputs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizationInputsComponent implements OnInit {
    @Input() controlRu: AbstractControl = new FormControl();
    @Input() controlKy: AbstractControl = new FormControl();
    @Input() controlUz: AbstractControl = new FormControl();
    @Input() placeholder: string;
    @Input() submitted = false;

    @Input() label: string;
    constructor() {}

    ngOnInit(): void {}
}
