import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-search-select',
    templateUrl: './search-select.component.html',
    styleUrls: ['./search-select.component.scss'],
})
export class SearchSelectComponent implements OnInit {
    @Input() placeholder: string;
    @Input() data;

    isLoading = false;

    constructor() {}
    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);

    onSearch($event) {}
    ngOnInit(): void {}
}
