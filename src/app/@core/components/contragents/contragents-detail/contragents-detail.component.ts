import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-contragents-detail',
    templateUrl: './contragents-detail.component.html',
    styleUrls: ['./contragents-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContragentsDetailComponent implements OnInit {
    @Input() data;
    constructor() {}

    ngOnInit(): void {
        console.log(this.data);
    }
}
