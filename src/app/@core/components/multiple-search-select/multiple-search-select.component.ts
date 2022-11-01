import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
@Component({
    selector: 'ngx-multiple-search-select',
    templateUrl: './multiple-search-select.component.html',
    styleUrls: ['./multiple-search-select.component.scss'],
})
export class MultipleSearchSelectComponent implements OnInit {
    @Output() searchEmit = new EventEmitter<string>();
    @Input() control: AbstractControl = new FormControl();

    @Input() placeholder: string;
    @Input() data;

    isLoading = false;

    constructor() {}
    compareFn = (o1: any, o2: any) =>
        o1 && o2
            ? typeof o1 === 'object'
                ? o1.id === o2
                : o1 === o2
            : o1 === o2;

    onSearch(event) {
        this.searchEmit.emit(event);
    }

    ngOnInit(): void {}
}
