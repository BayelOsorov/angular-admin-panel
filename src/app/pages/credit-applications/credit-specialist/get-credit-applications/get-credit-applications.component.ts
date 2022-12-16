import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    templateUrl: './get-credit-applications.component.html',
    styleUrls: ['./get-credit-applications.component.scss'],
})
export class GetCreditApplicationsComponent implements OnInit {
    private destroy$: Subject<void> = new Subject<void>();
    constructor(public router: Router, private toaster: ToastrService) {}
    loanApplication() {
        // this.photoIdentificationToggle = true;
        // this.identificationService
        //     .getPhotoIdentification()
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe({
        //         next: (data) => {
        //             // this.photoIdentificationToggle = false;
        //             if (!data) {
        //                 return this.toaster.warning(
        //                     'На данный момент нет заякок на фотоидентификацию!'
        //                 );
        //             }
        this.router.navigate([`credit-application/0-0-3/detail/4354353453`]);
        //         },
        //         error: () => {
        //             this.photoIdentificationToggle = false;
        //         },
        //     });
    }
    fuelApplication() {
        // this.photoIdentificationToggle = true;
        // this.identificationService
        //     .getPhotoIdentification()
        //     .pipe(takeUntil(this.destroy$))
        //     .subscribe({
        //         next: (data) => {
        //             // this.photoIdentificationToggle = false;
        //             if (!data) {
        //                 return this.toaster.warning(
        //                     'На данный момент нет заякок на фотоидентификацию!'
        //                 );
        //             }
        //             this.router.navigate([`identification/detail/${data.id}`]);
        //         },
        //         error: () => {
        //             this.photoIdentificationToggle = false;
        //         },
        //     });
    }
    applications = {
        '0-0-3': this.loanApplication,
        fuel: this.fuelApplication,
    };
    getApplication() {
        const urlEnd = this.router.url.split('/')[2];
        // this.applications[urlEnd]();
        this.loanApplication();
    }
    ngOnInit(): void {}
}
