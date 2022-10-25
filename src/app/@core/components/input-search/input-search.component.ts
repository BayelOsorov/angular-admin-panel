import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
    filter,
    debounceTime,
    distinctUntilChanged,
    tap,
} from 'rxjs/operators';
@Component({
    selector: 'ngx-input-search',
    templateUrl: './input-search.component.html',
    styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit, AfterViewInit {
    @Output() searchEvent = new EventEmitter<number>();
    @ViewChild('input', { static: true }) input: ElementRef;
    @Input() placeholder: string;
    constructor() {}

    ngOnInit(): void {}
    ngAfterViewInit() {
        // server-side search
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(500),
                distinctUntilChanged(),
                tap((event: KeyboardEvent) => {
                    this.searchEvent.emit(this.input.nativeElement.value);
                })
            )
            .subscribe();
    }
}
