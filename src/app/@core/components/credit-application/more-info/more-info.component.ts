import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { ICreditApplicationDetail } from '../../../models/credit-application/credit-application';

@Component({
    selector: 'ngx-credit-application-more-info',
    templateUrl: './more-info.component.html',
    styleUrls: ['./more-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditApplicationMoreInfoComponent implements OnInit {
    @Input() data: ICreditApplicationDetail;
    constructor() {}

    ngOnInit(): void {}
}
