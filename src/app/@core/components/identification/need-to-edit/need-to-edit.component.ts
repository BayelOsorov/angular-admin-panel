import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-identification-need-to-edit',
    templateUrl: './need-to-edit.component.html',
    styleUrls: ['./need-to-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedToEditComponent implements OnInit, OnDestroy {
    @Input() control: AbstractControl = new FormControl();

    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() mode = 'default';
    @Input() size = 'large';
    @Input() placeholder: string;
    @Input() data;

    constructor(private cdr: ChangeDetectorRef) {}
    onChange(val) {
        this.control.patchValue([val]);
    }
    ngOnInit(): void {}
    ngOnDestroy() {}
}
