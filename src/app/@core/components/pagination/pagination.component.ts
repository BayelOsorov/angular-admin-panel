import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';

@Component({
    selector: 'ngx-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {
    @Input() data;
    @Output() changePageEvent = new EventEmitter();
    constructor() {}
    changePage(page) {
        this.changePageEvent.emit(page);
    }
    ngOnInit(): void {
        console.log(this.data);
    }
}
