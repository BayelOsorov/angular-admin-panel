import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';

@Component({
    templateUrl: './identification-get.component.html',
    styleUrls: ['./identification-get.component.scss'],
})
export class IdentificationGetComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    constructor(private identificationService: IdentificationService) {}
    photoIdentification() {
        this.identificationService
            .getPhotoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                console.log(data);
            });
    }
    videoIdentification() {
        this.identificationService
            .getVideoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                console.log(data);
            });
    }
    ngOnInit(): void {}
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
