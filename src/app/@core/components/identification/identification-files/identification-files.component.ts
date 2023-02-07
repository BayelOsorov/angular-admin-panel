import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
                this.videos = res;
            });
    }
    ngOnInit(): void {
        this.getVideos();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
