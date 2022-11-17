import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../models/identification/identification';

@Component({
    selector: 'ngx-identification-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    animations: [
        trigger('openClose', [
            state('true', style({ height: '*' })),
            state('false', style({ height: '0px' })),
            transition('false <=> true', [animate(500)]),
        ]),
    ],
})
export class DetailComponent implements OnInit {
    @Input() data: IIdentificationDetail;
    @Input() personalData: IPersonalData;

    toggle = false;

    constructor() {}
    getDataToggle() {
        this.toggle = !this.toggle;
    }
    ngOnInit(): void {
        console.log(this.data);
    }
}
