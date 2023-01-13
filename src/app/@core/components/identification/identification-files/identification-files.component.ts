import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ngx-identification-files',
    templateUrl: './identification-files.component.html',
    styleUrls: ['./identification-files.component.scss'],
})
export class IdentificationFilesComponent implements OnInit {
    @Input() data;
    constructor() {}

    ngOnInit(): void {}
}
