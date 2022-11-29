import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerPromsService } from '../../../../@core/services/catalog/partner-proms/partner-proms.service';
import { PartnersService } from '../../../../@core/services/catalog/partners/partners.service';
@Component({
    templateUrl: './actions-partner-proms.component.html',
    styleUrls: ['./actions-partner-proms.component.scss'],
})
export class ActionsPartnerPromsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    coverImg;
    partnerPromsId;
    partnerPromsData;
    submitted = false;
    partners = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnerPromsService: PartnerPromsService,
        private partnerService: PartnersService,
        private route: ActivatedRoute,
        private router: Router,
        protected dateService: NbDateService<Date>
    ) {}

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.partnerPromsData) {
                this.partnerPromsService
                    .editPartnerProms(this.partnerPromsData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/partner-proms`]);
                    });
                return;
            }

            this.partnerPromsService
                .createPartnerProms(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    console.log(this.form.value.startDateTime, '-- ', data);

                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/partner-proms`]);
                });
        }
    }
    dateChange(d, type) {
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        this.form.controls[type].patchValue(d.toISOString());
    }
    changeContent(data) {
        this.form.patchValue({
            hmtlBody: data,
        });
    }
    getPartners(name = '') {
        this.partnerService
            .getListPartners(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.partners = res.items));
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            partnerId: ['', Validators.required],
            cover: ['', Validators.required],
            title: ['', [Validators.required, Validators.maxLength(256)]],
            hmtlBody: ['', Validators.required],
            startDateTime: ['', Validators.required],
            endDateTime: ['', Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.partnerPromsId = params['id'];
        });
        this.getPartners();
        if (this.partnerPromsId) {
            this.partnerPromsService
                .getDetailPartnerProms(this.partnerPromsId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.partnerPromsData = data;
                        this.coverImg = data.cover;
                        this.form.controls['title'].setValue(data.title);
                        this.form.controls['cover'].setValue(data.cover);
                        this.form.controls['partnerId'].setValue(
                            data.partnerId
                        );
                        this.form.controls['hmtlBody'].setValue(data.hmtlBody);
                        this.form.controls['startDateTime'].setValue(
                            data.startDateTime
                        );
                        this.form.controls['endDateTime'].setValue(
                            data.endDateTime
                        );
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
