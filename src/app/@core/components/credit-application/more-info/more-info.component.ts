import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-credit-application-more-info',
    templateUrl: './more-info.component.html',
    styleUrls: ['./more-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditApplicationMoreInfoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
