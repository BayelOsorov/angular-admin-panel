import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SupportCenterService } from '../../../services/support-center/support-center.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
@Component({
    selector: 'ngx-actions-modal',
    templateUrl: './actions-modal.component.html',
    styleUrls: ['./actions-modal.component.scss'],
})
export class SupportCenterActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    createItem;
    placeholder;
    updateItem;
    submitted = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private supportService: SupportCenterService,
        private toaster: ToastrService,
        private router: Router,
        private windowService: NbWindowService,
        private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            ru: ['', [Validators.required, Validators.maxLength(256)]],
            uz: ['', [Validators.required, Validators.maxLength(256)]],
            kg: ['', [Validators.required, Validators.maxLength(256)]],
        });
        if (this.itemData) {
            this.form.controls['ru'].setValue(this.itemData.name.ru);
            this.form.controls['uz'].setValue(this.itemData.name.uz);
            this.form.controls['kg'].setValue(this.itemData.name.kg);
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.itemData) {
                this.updateItem(this.itemData.id, {
                    name: {
                        ru: this.form.value.ru,
                        uz: this.form.value.uz,
                        kg: this.form.value.kg,
                    },
                });

                return;
            }

            this.createItem({
                name: {
                    ru: this.form.value.ru,
                    uz: this.form.value.uz,
                    kg: this.form.value.kg,
                },
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
