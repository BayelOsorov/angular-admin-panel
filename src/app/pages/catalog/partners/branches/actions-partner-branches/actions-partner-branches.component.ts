import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailPartnerBranch } from '../../../../../@core/models/catalog/partners';
import { LocalitiesService } from '../../../../../@core/services/catalog/localities/localities.service';
import { MallsService } from '../../../../../@core/services/catalog/malls/malls.service';
import { PartnersService } from '../../../../../@core/services/catalog/partners/partners.service';
import { Location } from '@angular/common';
@Component({
    templateUrl: './actions-partner-branches.component.html',
    styleUrls: ['./actions-partner-branches.component.scss'],
})
export class ActionsPartnerBranchesComponent implements OnInit, OnDestroy {
    form: FormGroup;
    branchData: IDetailPartnerBranch;
    submitted = false;
    branchId: number;
    partnerId: number;
    location;
    localities = [];
    malls = [];

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private partnersService: PartnersService,
        private mallsService: MallsService,
        private localitiesService: LocalitiesService,
        private _location: Location
    ) {}

    onSubmit() {
        this.submitted = true;

        if (this.form.valid) {
            const {
                workingHourStart_1,
                workingHourEnd_1,
                lunchHourStart_1,
                lunchHourEnd_1,
                workingHourStart_2,
                workingHourEnd_2,
                lunchHourStart_2,
                lunchHourEnd_2,
                workingHourStart_3,
                workingHourEnd_3,
                lunchHourStart_3,
                lunchHourEnd_3,
                workingHourStart_4,
                workingHourEnd_4,
                lunchHourStart_4,
                lunchHourEnd_4,
                workingHourStart_5,
                workingHourEnd_5,
                lunchHourStart_5,
                lunchHourEnd_5,
                workingHourStart_6,
                workingHourEnd_6,
                lunchHourStart_6,
                lunchHourEnd_6,
                workingHourStart_7,
                workingHourEnd_7,
                lunchHourStart_7,
                lunchHourEnd_7,
                location,
                phoneNumber,
            } = this.form.value;
            const data = {
                phoneNumber: phoneNumber
                    ? '+996' + phoneNumber.replaceAll(' ', '')
                    : null,
                location: {
                    type: 'Point',
                    coordinates: location,
                },
                workingSchedule: [
                    workingHourStart_1 && {
                        day: 'Monday',
                        workingHourStart: workingHourStart_1,
                        workingHourEnd: workingHourEnd_1,
                        lunchHourStart: lunchHourStart_1,
                        lunchHourEnd: lunchHourEnd_1,
                    },
                    workingHourStart_2 && {
                        day: 'Tuesday',
                        workingHourStart: workingHourStart_2,
                        workingHourEnd: workingHourEnd_2,
                        lunchHourStart: lunchHourStart_2,
                        lunchHourEnd: lunchHourEnd_2,
                    },
                    workingHourStart_3 && {
                        day: 'Wednesday',
                        workingHourStart: workingHourStart_3,
                        workingHourEnd: workingHourEnd_3,
                        lunchHourStart: lunchHourStart_3,
                        lunchHourEnd: lunchHourEnd_3,
                    },
                    workingHourStart_4 && {
                        day: 'Thursday',
                        workingHourStart: workingHourStart_4,
                        workingHourEnd: workingHourEnd_4,
                        lunchHourStart: lunchHourStart_4,
                        lunchHourEnd: lunchHourEnd_4,
                    },
                    workingHourStart_5 && {
                        day: 'Friday',
                        workingHourStart: workingHourStart_5,
                        workingHourEnd: workingHourEnd_5,
                        lunchHourStart: lunchHourStart_5,
                        lunchHourEnd: lunchHourEnd_5,
                    },
                    workingHourStart_6 && {
                        day: 'Saturday',
                        workingHourStart: workingHourStart_6,
                        workingHourEnd: workingHourEnd_6,
                        lunchHourStart: lunchHourStart_6,
                        lunchHourEnd: lunchHourEnd_6,
                    },
                    workingHourStart_7 && {
                        day: 'Sunday',
                        workingHourStart: workingHourStart_7,
                        workingHourEnd: workingHourEnd_7,
                        lunchHourStart: lunchHourStart_7,
                        lunchHourEnd: lunchHourEnd_7,
                    },
                ],
            };
            if (this.branchData) {
                this.partnersService
                    .editPartnerBranch(this.partnerId, this.branchData.id, {
                        ...this.form.value,
                        ...data,
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this._location.back();
                    });
                return;
            }

            this.partnersService
                .createPartnerBranch(this.partnerId, {
                    ...this.form.value,
                    ...data,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this._location.back();
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
    getMalls(name = '') {
        this.mallsService
            .getListMalls(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.malls = data.items;
            });
    }

    handlePhone(num) {
        const txt = num.key;

        if ((txt.length === 12 || num.which === 32) && num.which !== 8) {
            num.preventDefault();
        }

        if (
            (this.form.controls.phoneNumber.value.length === 3 ||
                this.form.controls.phoneNumber.value.length === 6 ||
                this.form.controls.phoneNumber.value.length === 9) &&
            num.which !== 8
        ) {
            this.form.patchValue({
                phoneNumber: this.form.controls.phoneNumber.value + ' ',
            });
        }
    }
    setTimes() {
        const {
            workingHourStart_1,
            workingHourEnd_1,
            lunchHourStart_1,
            lunchHourEnd_1,
        } = this.form.controls;
        this.form.patchValue({
            workingHourStart_2: workingHourStart_1.value,
            workingHourEnd_2: workingHourEnd_1.value,
            lunchHourStart_2: lunchHourStart_1.value,
            lunchHourEnd_2: lunchHourEnd_1.value,
            workingHourStart_3: workingHourStart_1.value,
            workingHourEnd_3: workingHourEnd_1.value,
            lunchHourStart_3: lunchHourStart_1.value,
            lunchHourEnd_3: lunchHourEnd_1.value,
            workingHourStart_4: workingHourStart_1.value,
            workingHourEnd_4: workingHourEnd_1.value,
            lunchHourStart_4: lunchHourStart_1.value,
            lunchHourEnd_4: lunchHourEnd_1.value,
            workingHourStart_5: workingHourStart_1.value,
            workingHourEnd_5: workingHourEnd_1.value,
            lunchHourStart_5: lunchHourStart_1.value,
            lunchHourEnd_5: lunchHourEnd_1.value,
            workingHourStart_6: workingHourStart_1.value,
            workingHourEnd_6: workingHourEnd_1.value,
            lunchHourStart_6: lunchHourStart_1.value,
            lunchHourEnd_6: lunchHourEnd_1.value,
            workingHourStart_7: workingHourStart_1.value,
            workingHourEnd_7: workingHourEnd_1.value,
            lunchHourStart_7: lunchHourStart_1.value,
            lunchHourEnd_7: lunchHourEnd_1.value,
        });
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(256)]],
            address: ['', [Validators.required, Validators.maxLength(256)]],
            phoneNumber: ['', Validators.required],
            email: [''],
            location: ['', Validators.required],

            workingHourStart_1: ['', Validators.required],
            workingHourEnd_1: ['', Validators.required],
            lunchHourStart_1: [''],
            lunchHourEnd_1: [''],

            workingHourStart_2: ['', Validators.required],
            workingHourEnd_2: ['', Validators.required],
            lunchHourStart_2: [''],
            lunchHourEnd_2: [''],

            workingHourStart_3: ['', Validators.required],
            workingHourEnd_3: ['', Validators.required],
            lunchHourStart_3: [''],
            lunchHourEnd_3: [''],

            workingHourStart_4: ['', Validators.required],
            workingHourEnd_4: ['', Validators.required],
            lunchHourStart_4: [''],
            lunchHourEnd_4: [''],

            workingHourStart_5: ['', Validators.required],
            workingHourEnd_5: ['', Validators.required],
            lunchHourStart_5: [''],
            lunchHourEnd_5: [''],

            workingHourStart_6: [''],
            workingHourEnd_6: [''],
            lunchHourStart_6: [''],
            lunchHourEnd_6: [''],

            workingHourStart_7: [''],
            workingHourEnd_7: [''],
            lunchHourStart_7: [''],
            lunchHourEnd_7: [''],

            localityId: ['', Validators.required],
            mallId: [''],
        });
        this.route.params.subscribe((params) => {
            this.branchId = params['branchId'];
            this.partnerId = params['partnerId'];
        });
        this.getLocalities();
        this.getMalls();
        if (this.branchId) {
            this.partnersService
                .getDetailPartnerBranch(this.partnerId, this.branchId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.branchData = data;
                        this.form.controls['name'].setValue(data.name);
                        this.form.controls['mallId'].setValue(data.mallId);
                        this.form.controls['phoneNumber'].setValue(
                            data.phoneNumber.replace('+996', '')
                        );
                        this.form.controls['location'].setValue(
                            data.location.coordinates
                        );

                        this.form.controls['email'].setValue(data.email);
                        this.form.controls['address'].setValue(data.address);

                        this.form.controls['localityId'].setValue(
                            data.localityId
                        );
                        this.location = data.location.coordinates;
                        data.workingSchedule.forEach((item) => {
                            switch (item.day) {
                                case 'Monday':
                                    this.form.controls[
                                        'workingHourStart_1'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_1'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_1'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_1'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Tuesday':
                                    this.form.controls[
                                        'workingHourStart_2'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_2'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_2'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_2'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Wednesday':
                                    this.form.controls[
                                        'workingHourStart_3'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_3'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_3'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_3'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Thursday':
                                    this.form.controls[
                                        'workingHourStart_4'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_4'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_4'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_4'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Friday':
                                    this.form.controls[
                                        'workingHourStart_5'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_5'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_5'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_5'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Saturday':
                                    this.form.controls[
                                        'workingHourStart_6'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_6'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_6'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_6'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                case 'Sunday':
                                    this.form.controls[
                                        'workingHourStart_7'
                                    ].setValue(item?.workingHourStart);
                                    this.form.controls[
                                        'workingHourEnd_7'
                                    ].setValue(item?.workingHourEnd);
                                    this.form.controls[
                                        'lunchHourStart_7'
                                    ].setValue(item?.lunchHourStart);
                                    this.form.controls[
                                        'lunchHourEnd_7'
                                    ].setValue(item?.lunchHourEnd);

                                    break;
                                default:
                                    break;
                            }
                        });
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
