import {
    Component,
    OnDestroy,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { getHoursAndMinutes } from '../../../utils';
@Component({
    selector: 'ngx-list-identification-customers',
    templateUrl: './list-identification-customers.component.html',
    styleUrls: ['./list-identification-customers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListIdentificationCustomersComponent implements OnInit {
    @Output() getApplicationsEvent = new EventEmitter();
    @Input() tableColumns;
    @Input() listApplications;
    @Input() filterForm;
    @Input() detailPath;

    options = [];

    private destroy$: Subject<void> = new Subject<void>();
    constructor(private router: Router) {}
    onRowSelect(id) {
        this.router.navigate([this.detailPath + id]);
    }
    ngOnInit(): void {
        this.options = getHoursAndMinutes();
    }
}
