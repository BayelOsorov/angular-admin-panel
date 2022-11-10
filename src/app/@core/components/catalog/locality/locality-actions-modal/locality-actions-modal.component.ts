import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalitiesService } from '../../../../services/catalog/localities/localities.service';
@Component({
    selector: 'ngx-locality-actions-modal',
    templateUrl: './locality-actions-modal.component.html',
    styleUrls: ['./locality-actions-modal.component.scss'],
})
export class LocalityActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    submitted = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private localityService: LocalitiesService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            ru: ['', Validators.required],
            uz: ['', Validators.required],
            kg: ['', Validators.required],
            isActive: [true, Validators.required],
        });
        if (this.itemData) {
            this.form.controls['ru'].setValue(this.itemData.name.ru);
            this.form.controls['uz'].setValue(this.itemData.name.uz);
            this.form.controls['kg'].setValue(this.itemData.name.kg);
            this.form.controls['isActive'].setValue(this.itemData.isActive);
        }
    }

    onFirstSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.itemData) {
                this.localityService
                    .editLocality(this.itemData.id, {
                        ...this.form.value,
                        name: {
                            ru: this.form.value.ru,
                            uz: this.form.value.uz,
                            kg: this.form.value.kg,
                        },
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.localityService
                .createLocality({
                    ...this.form.value,
                    name: {
                        ru: this.form.value.ru,
                        uz: this.form.value.uz,
                        kg: this.form.value.kg,
                    },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
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
