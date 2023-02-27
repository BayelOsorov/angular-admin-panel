import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-fuel-card-user-detail',
    templateUrl: './fuel-card-user-detail.component.html',
    styleUrls: ['./fuel-card-user-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuelCardUserDetailComponent implements OnInit {
    @Input() kibData;
    constructor() {}

    ngOnInit(): void {}
}
