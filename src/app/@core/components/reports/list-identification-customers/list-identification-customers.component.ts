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
    options = [];

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    onRowSelect(id) {
        this.router.navigate(['/users/detail/' + id]);
    }
    ngOnInit(): void {
        this.options = getHoursAndMinutes();
    }
}
