import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IdentificationService } from '../../../../@core/services/identification/identification.service';

@Component({
    templateUrl: './identification-get.component.html',
    styleUrls: ['./identification-get.component.scss'],
})
export class IdentificationGetComponent implements OnInit, OnDestroy {
    photoIdentificationToggle = false;
    videoIdentificationToggle = false;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private router: Router,
        private toaster: ToastrService
    ) {}
    photoIdentification() {
        this.photoIdentificationToggle = true;
        this.identificationService
            .getPhotoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    // this.photoIdentificationToggle = false;
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок на фотоидентификацию!'
                        );
                    }
                    this.router.navigate([`identification/detail/${data.id}`]);
                },
                error: () => {
                    this.photoIdentificationToggle = false;
                },
            });
    }
    videoIdentification() {
        // this.videoIdentificationToggle = true;

        this.identificationService
            .getVideoIdentification()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.videoIdentificationToggle = false;
                    if (!data) {
                        return this.toaster.warning(
                            'На данный момент нет заякок на видеоидентификацию!'
                        );
                    }
                    this.router.navigate([`identification/detail/${data.id}`]);
                },
                error: (err) => {
                    console.log(err, 'error rrerere');

                    this.videoIdentificationToggle = false;
                },
            });
    }
    ngOnInit(): void {}
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
