import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
    selector: 'ngx-editor',
    template: `<ckeditor
        (change)="onChange($event)"
        [editor]="Editor"
        [ngClass]="isRequired && submitted && control.errors?.['required']
                                    ? 'validation'
                                    : ''
                            "
        [data]="data"
    ></ckeditor>`,
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
    @Output() changeEvent = new EventEmitter();
    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() data;

    @Input() control: AbstractControl = new FormControl();

    public Editor = ClassicEditor;
    constructor() {}

    public onChange({ editor }: ChangeEvent) {
        const data = editor.getData();
        this.changeEvent.emit(data);
    }
    ngOnInit(): void {}
}
