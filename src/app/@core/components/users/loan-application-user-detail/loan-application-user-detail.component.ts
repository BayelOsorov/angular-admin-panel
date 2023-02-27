import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-loan-application-user-detail',
    templateUrl: './loan-application-user-detail.component.html',
    styleUrls: ['./loan-application-user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanApplicationUserDetailComponent implements OnInit {
    @Input() kibData;
    constructor() {}

    ngOnInit(): void {}
}
