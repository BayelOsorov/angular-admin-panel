/* eslint-disable brace-style */
import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalContractorsService } from '../../../../services/contragents/legal-contractors.service';
@Component({
    selector: 'ngx-legal-contractor-beneficiary-actions',
    templateUrl: './legal-contractor-beneficiary-actions.component.html',
    styleUrls: ['./legal-contractor-beneficiary-actions.component.scss'],
})
export class LegalContractorBeneficiaryActionsComponent
    implements OnInit, OnDestroy
{
    form: FormGroup;
    itemData;
    contractorId;
    imgSrc;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private legalContractorsService: LegalContractorsService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
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

        if (this.itemData) {
            this.form.controls['title'].setValue(this.itemData.title);
            this.form.controls['image'].setValue(this.itemData.imagePath);
            this.form.controls['sequence'].setValue(this.itemData.sequence);
            this.imgSrc = this.itemData.imagePath;
        }
    }

    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.legalContractorsService
                    .editLegalContractorBeneficiary(
                        this.contractorId,
                        this.itemData.id,
                        this.form.value
                    )
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.legalContractorsService
                .createLegalContractorBeneficiary(this.contractorId, {
                    images: [this.form.value],
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.dialogRef.close('create');
                });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
