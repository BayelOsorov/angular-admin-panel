import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-search-select',
    templateUrl: './search-select.component.html',
    styleUrls: ['./search-select.component.scss'],
})
export class SearchSelectComponent implements OnInit {
    @Output() searchEmit = new EventEmitter<string>();
    @Input() control: AbstractControl = new FormControl();

    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() mode = 'default';
    @Input() size = 'large';
    @Input() placeholder: string;
    @Input() data;

    isLoading = false;

    constructor() {}
    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);

    onSearch(event) {
        this.searchEmit.emit(event);
    }

    ngOnInit(): void {
        this.control.valueChanges.subscribe((data) => console.log(data));
    }
}
