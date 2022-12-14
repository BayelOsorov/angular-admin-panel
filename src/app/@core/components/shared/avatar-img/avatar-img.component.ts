import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `<img
        width="43"
        height="43"
        class="bg-info rounded-circle mx-auto d-flex"
        [src]="renderValue | useHttpImgSrc"
    />`,
})
export class AvatarImgComponent implements ViewCell, OnInit {
    @Input() value: string | number;
    @Input() rowData: any;
    renderValue: string;
    constructor() {}

    ngOnInit(): void {
        this.renderValue = this.value.toString();
    }
}
