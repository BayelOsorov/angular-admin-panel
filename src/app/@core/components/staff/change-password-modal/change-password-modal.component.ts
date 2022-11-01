import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StaffService } from '../../../services/staff/staff.service';
import { GeneratePassword } from '../../../utils';

@Component({
    selector: 'ngx-change-password-modal',
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    staffId: string;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private toaster: ToastrService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
        });
    }
    generatePassword() {
        const password = GeneratePassword();
        this.form.controls['password'].setValue(password);
        this.form.controls['passwordConfirmation'].setValue(password);
    }
    onSubmit() {
        if (this.form.valid) {
            this.staffService
                .changeStaffPassword(this.staffId, this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    this.toaster.success('Пароль успешно изменен');
                    this.dialogRef.close();
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
