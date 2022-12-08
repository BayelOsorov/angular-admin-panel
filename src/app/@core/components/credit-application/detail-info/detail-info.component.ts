import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-credit-application-detail-info',
    templateUrl: './detail-info.component.html',
    styleUrls: ['./detail-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditApplicationDetailInfoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
