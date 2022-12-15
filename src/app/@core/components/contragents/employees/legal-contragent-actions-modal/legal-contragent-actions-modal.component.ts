import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LegalContractorsService } from '../../../../services/contragents/legal-contractors.service';
@Component({
    selector: 'ngx-legal-contragent-actions-modal',
    templateUrl: './legal-contragent-actions-modal.component.html',
    styleUrls: ['./legal-contragent-actions-modal.component.scss'],
})
export class LegalContragentActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    contractorId;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private legalContractorsService: LegalContractorsService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            userId: [
                '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                Validators.required,
            ],
            position: ['', Validators.required],
            name: ['', Validators.required],
        });

        if (this.itemData) {
            this.form.controls['userId'].setValue(this.itemData.userId);
            this.form.controls['position'].setValue(this.itemData.position);
            this.form.controls['name'].setValue(this.itemData.name);
        }
    }

    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.legalContractorsService
                    .editLegalContractorEmployee(
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
                .createLegalContractorEmployee(
                    this.contractorId,
                    this.form.value
                )
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
