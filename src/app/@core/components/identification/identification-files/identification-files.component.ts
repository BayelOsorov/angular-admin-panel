import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-identification-files',
    templateUrl: './identification-files.component.html',
    styleUrls: ['./identification-files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationFilesComponent implements OnInit {
    @Input() data;
    constructor() {}

    ngOnInit(): void {}
}
