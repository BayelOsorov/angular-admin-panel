import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';

@Component({
    selector: 'ngx-editor',
    template: `<ckeditor
        [config]="{ extraPlugins: 'divarea', height: '320' }"
    ></ckeditor>`,
    styleUrls: ['./editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
