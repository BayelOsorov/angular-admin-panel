import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';
import { truncateDecimals } from '../../../utils';

@Component({
    selector: 'ngx-black-list-person',
    templateUrl: './black-list-person.component.html',
    styleUrls: ['./black-list-person.component.scss'],
})
export class BlackListPersonComponent implements OnInit, OnDestroy {
    @Input() fullname;
    Math = Math;
    blackList;
    truncateDecimals;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private applicationRequestsService: ApplicationRequestsService
    ) {}
    getBlackListPerson() {
        this.applicationRequestsService
            .getBlackListPerson(this.fullname)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.blackList = data;
                },
            });
    }

    ngOnInit(): void {
        this.getBlackListPerson();
        this.truncateDecimals = truncateDecimals;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
