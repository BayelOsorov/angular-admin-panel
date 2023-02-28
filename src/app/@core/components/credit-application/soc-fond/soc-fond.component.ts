import {
    Component,
    OnDestroy,
    OnInit,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';

@Component({
    selector: 'ngx-soc-fond',
    templateUrl: './soc-fond.component.html',
    styleUrls: ['./soc-fond.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocFondComponent implements OnInit, OnDestroy {
    @Input() pin;
    socialFund;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private applicationRequestsService: ApplicationRequestsService
    ) {}
    getSocialFund() {
        this.applicationRequestsService
            .getSocialFund(this.pin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.socialFund = data;
                },
            });
    }
    ngOnInit(): void {
        this.getSocialFund();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
