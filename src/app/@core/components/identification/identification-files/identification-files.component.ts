import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';

@Component({
    selector: 'ngx-identification-files',
    templateUrl: './identification-files.component.html',
    styleUrls: ['./identification-files.component.scss'],
})
export class IdentificationFilesComponent implements OnInit, OnDestroy {
    @Input() data;
    videos;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private authService: AuthService,
        private creditService: ApplicationRequestsService
    ) {}
    getVideos() {
        this.creditService
            .getCustomerVideoCalls(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.videos = this.sortArray(res);
            });
    }
    sortArray = (arr) =>
        arr.sort(
            (a, b) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
        );
    ngOnInit(): void {
        this.getVideos();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
