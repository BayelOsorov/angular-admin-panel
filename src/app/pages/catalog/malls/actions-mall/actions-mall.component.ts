import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IDetailMalls } from '../../../../@core/models/catalog/malls';
import { LocalitiesService } from '../../../../@core/services/catalog/localities/localities.service';
import { MallsService } from '../../../../@core/services/catalog/malls/malls.service';
import { toBase64 } from '../../../../@core/utils/toBase64';
@Component({
    templateUrl: './actions-mall.component.html',
    styleUrls: ['./actions-mall.component.scss'],
})
export class ActionsMallComponent implements OnInit, OnDestroy {
    form: FormGroup;
    logoImg;
    mallData: IDetailMalls;
    submitted = false;
    mallId: number;
    location;
    localities = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private mallsService: MallsService,
        private localitiesService: LocalitiesService
    ) {}

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.mallData) {
                this.mallsService
                    .editMall(this.mallData.id, {
                        ...this.form.value,
                        location: {
                            type: 'Point',
                            coordinates: this.form.value.location,
                        },
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/malls`]);
                    });
                return;
            }

            this.mallsService
                .createMall({
                    ...this.form.value,
                    location: {
                        type: 'Point',
                        coordinates: this.form.value.location,
                    },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/malls`]);
                });
        }
    }

    getLocalities(name = '') {
        this.localitiesService
            .getListLocalities(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.localities = data.items;
            });
    }
    markMap(loc) {
        this.form.patchValue({
            location: loc,
        });
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            logo: ['', Validators.required],
            isActive: [true, Validators.required],
            address: ['', Validators.required],
            description: ['', Validators.required],
            order: ['', Validators.required],
            location: ['', Validators.required],
            workingHourStart: ['', Validators.required],
            workingHourEnd: ['', Validators.required],
            localityId: ['', Validators.required],
            type: ['', Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.mallId = params['id'];
        });
        this.getLocalities();
        if (this.mallId) {
            this.mallsService
                .getDetailMall(this.mallId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.mallData = data;
                        this.form.controls['name'].setValue(data.name);
                        this.form.controls['isActive'].setValue(data.isActive);
                        this.form.controls['logo'].setValue(data.logo);
                        this.form.controls['location'].setValue(
                            data.location.coordinates
                        );
                        this.form.controls['workingHourEnd'].setValue(
                            data.workingHourEnd
                        );

                        this.form.controls['workingHourStart'].setValue(
                            data.workingHourStart
                        );
                        this.form.controls['type'].setValue(data.type);
                        this.form.controls['address'].setValue(data.address);
                        this.form.controls['description'].setValue(
                            data.description
                        );
                        this.form.controls['order'].setValue(data.order);
                        this.form.controls['localityId'].setValue(
                            data.locality
                        );
                        this.logoImg = data.logo;
                        this.location = data.location.coordinates;
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
