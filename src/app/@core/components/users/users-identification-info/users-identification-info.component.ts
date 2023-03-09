import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

@Component({
    selector: 'ngx-users-identification-info',
    templateUrl: './users-identification-info.component.html',
    styleUrls: ['./users-identification-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersIdentificationInfoComponent implements OnInit {
    @Input() userData;
    @Input() videos;

    constructor() {}
    trackByFn(index, item) {
        return item.id;
    }
    ngOnInit(): void {}
}
