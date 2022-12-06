import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../../services/catalog/partners/partners.service';
@Component({
    selector: 'ngx-messengers-actions-modal',
    templateUrl: './messengers-actions-modal.component.html',
    styleUrls: ['./messengers-actions-modal.component.scss'],
})
export class MessengersActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    partnerId;
    submitted = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnersService: PartnersService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            type: ['', [Validators.required]],
            link: ['', [Validators.required]],
        });
        if (this.itemData) {
            this.form.controls['name'].setValue(this.itemData.name);
            this.form.controls['type'].setValue(this.itemData.type);
            this.form.controls['link'].setValue(this.itemData.link);
        }
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form);

        if (this.form.valid) {
            if (this.itemData) {
                this.partnersService
                    .editPartnerMessenger(
                        this.itemData.partnerId,
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

            this.partnersService
                .createPartnerMessenger(this.partnerId, {
                    messengerModels: [{ ...this.form.value }],
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
