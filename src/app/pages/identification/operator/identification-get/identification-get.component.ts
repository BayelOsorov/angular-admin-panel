import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../../../@core/services/http/loader.service';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';

@Component({
    templateUrl: './identification-get.component.html',
    styleUrls: ['./identification-get.component.scss'],
})
export class IdentificationGetComponent implements OnInit, OnDestroy {
    loading;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        public router: Router,
        private toaster: ToastrService,
        private loaderService: LoaderService
    ) {
        this.loading = this.loaderService.isLoading;
    }
    photoIdentification() {
        this.identificationService
            .getPhotoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок на фотоидентификацию!'
                        );
                    }
                    this.router.navigate([`identification/detail/${data.id}`]);
                },
                error: () => {},
            });
    }
    videoIdentification() {
        // this.videoIdentificationToggle = true;

        this.identificationService
            .getVideoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок на видеоидентификацию!'
                        );
                    }
                    this.router.navigate([`identification/detail/${data.id}`]);
                },
                error: (err) => {},
            });
    }
    ngOnInit(): void {
        console.log(this.loaderService);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
