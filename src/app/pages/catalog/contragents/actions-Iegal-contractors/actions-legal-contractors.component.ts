import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalContractorsService } from '../../../../@core/services/contragents/legal-contractors.service';
@Component({
    templateUrl: './actions-legal-contractors.component.html',
    styleUrls: ['./actions-legal-contractors.component.scss'],
})
export class ActionsLegalContractorComponent implements OnInit, OnDestroy {
    form: FormGroup;
    nameImg;
    newsId;
    newsData;
    submitted = false;
    products = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private legalContractorsService: LegalContractorsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.newsData) {
                this.legalContractorsService
                    .editLegalContractor(this.newsData.id, {
                        ...this.form.value,
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/news`]);
                    });
                return;
            }

            this.legalContractorsService
                .createLegalContractor({
                    ...this.form.value,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/news`]);
                });
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            tin: ['', Validators.required],
            okpo: ['', [Validators.required, Validators.maxLength(256)]],
            registrationAddress: [
                '',
                [Validators.required, Validators.maxLength(256)],
            ],
            actualAddress: [
                '',
                [Validators.required, Validators.maxLength(256)],
            ],
            foundingDate: ['', [Validators.required]],
            manager: ['', [Validators.required, Validators.maxLength(256)]],
            managerId: ['', [Validators.required, Validators.maxLength(256)]],
            phone: ['', [Validators.required, Validators.maxLength(256)]],
            bic: ['', [Validators.required, Validators.maxLength(256)]],
            beneficiaries: [
                '',
                [Validators.required, Validators.maxLength(256)],
            ],
        });
        this.route.params.subscribe((params) => {
            this.newsId = params['id'];
        });
        if (this.newsId) {
            this.legalContractorsService
                .getDetailLegalContractor(this.newsId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.newsData = data;
                        this.form.controls['tin'].setValue(data.tin);
                        this.form.controls['name'].setValue(data.name);

                        this.form.controls['okpo'].setValue(data.okpo);
                        this.form.controls['registrationAddress'].setValue(
                            data.registrationAddress
                        );
                        this.form.controls['actualAddress'].setValue(
                            data.actualAddress
                        );

                        this.form.controls['foundingDate'].setValue(
                            data.foundingDate
                        );
                        this.form.controls['phone'].setValue(data.phone);
                        this.form.controls['bic'].setValue(data.bic);
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
