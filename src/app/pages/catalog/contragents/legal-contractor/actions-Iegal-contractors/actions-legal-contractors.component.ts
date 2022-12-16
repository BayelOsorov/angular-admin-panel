import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbNativeDateService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalContractorsService } from '../../../../../@core/services/contragents/legal-contractors.service';
@Component({
    templateUrl: './actions-legal-contractors.component.html',
    styleUrls: ['./actions-legal-contractors.component.scss'],
})
export class ActionsLegalContractorComponent implements OnInit, OnDestroy {
    form: FormGroup;
    legalContractorId;
    legalContractorData;
    submitted = false;
    beneficiaries = [];
    legalBeneficiary = 'legalBeneficiary';
    individualBeneficiary = 'individualBeneficiary';
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private legalContractorsService: LegalContractorsService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    onSubmit() {
        this.submitted = true;
        console.log(this.form);

        if (this.form.valid) {
            if (this.legalContractorData) {
                this.legalContractorsService
                    .editLegalContractor(
                        this.legalContractorData.id,
                        this.form.value
                    )
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.location.back();
                    });
                return;
            }
            const newBeneficiares = this.beneficiaries.map((item) => ({
                [item.type]: {
                    ...item.form.value,
                },
            }));
            this.legalContractorsService
                .createLegalContractor({
                    ...this.form.value,
                    beneficiaries: newBeneficiares,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.location.back();
                });
        }
    }
    addIPBeneficiares() {
        const ipForm = this.fb.group({
            surname: ['', Validators.required],
            name: ['', Validators.required],
            fatherName: ['', Validators.required],
            birthday: ['', Validators.required],
            birthplace: ['', Validators.required],
            nationality: ['', Validators.required],
            gender: ['', Validators.required],
            citizenship: ['', Validators.required],
            familyStatus: ['', Validators.required],
            passportNo: ['', Validators.required],
            dateOfIssue: ['', Validators.required],
            dateOfExpiration: ['', Validators.required],
            authority: ['', Validators.required],
            pin: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            bankAccount: ['', Validators.required],
            position: ['', Validators.required],
            appointmentDate: ['', Validators.required],
            releaseDate: ['', Validators.required],
            type: ['', Validators.required],
        });

        this.beneficiaries.push({
            form: ipForm,
            id: Date.now(),
            type: this.individualBeneficiary,
        });
    }
    addLegalBeneficiares() {
        const legalForm = this.fb.group({
            name: ['', Validators.required],
            tin: ['', Validators.required],
            okpo: ['', [Validators.required, Validators.maxLength(256)]],
            legalAddress: [
                '',
                [Validators.required, Validators.maxLength(256)],
            ],
            actualAddress: [
                '',
                [Validators.required, Validators.maxLength(256)],
            ],
            foundingDate: ['', [Validators.required]],
            manager: ['', [Validators.required, Validators.maxLength(256)]],
            type: ['', Validators.required],
        });
        this.beneficiaries.push({
            form: legalForm,
            id: Date.now(),
            type: this.legalBeneficiary,
        });
    }
    onSelect(val) {
        console.log(val);
    }
    deleteBeneficary(id) {
        this.beneficiaries = this.beneficiaries.filter(
            (item) => item.id !== id
        );
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
            foundingDate: [new Date(), [Validators.required]],
            phone: ['', [Validators.required, Validators.maxLength(256)]],
            bic: ['', [Validators.required, Validators.maxLength(256)]],
            manager: [
                '',
                this.legalContractorId && [
                    Validators.required,
                    Validators.maxLength(256),
                ],
            ],
            managerId: [
                '',
                this.legalContractorId && [
                    Validators.required,
                    Validators.maxLength(256),
                ],
            ],
            beneficiaries: [[]],
        });
        this.route.params.subscribe((params) => {
            this.legalContractorId = params['id'];
        });
        if (this.legalContractorId) {
            this.legalContractorsService
                .getDetailLegalContractor(this.legalContractorId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.legalContractorData = data;
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
