import {
    Component,
    OnDestroy,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'ngx-list-applications',
    templateUrl: './list-applications.component.html',
    styleUrls: ['./list-applications.component.scss'],
})
export class ListApplicationsComponent implements OnInit, OnDestroy {
    @Output() getApplicationsEvent = new EventEmitter();
    @Input() tableColumns;
    @Input() listApplications;
    @Input() filterForm;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private toaster: ToastrService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    onRowSelect(id) {
        this.router.navigate([this.router.url + '/detail/' + id]);
    }
    ngOnInit(): void {}
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
