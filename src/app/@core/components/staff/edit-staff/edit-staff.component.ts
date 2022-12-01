import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

import { IDetailStaff } from '../../../models/staff/staff';
import { StaffService } from '../../../services/staff/staff.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'ngx-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit, OnDestroy {
    form: FormGroup;
    staffDetail: IDetailStaff;
    roles = [];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private toaster: ToastrService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            userName: ['', Validators.required],
            roles: [[], [Validators.required]],
        });
        this.getRoles();

        if (this.staffDetail) {
            this.form.controls['name'].setValue(this.staffDetail.name);
            this.form.controls['userName'].setValue(this.staffDetail.userName);
            this.form.controls['roles'].setValue(this.staffDetail.roles);
        }
    }
    getRoles() {
        this.staffService
            .getRolesStaff()
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => (this.roles = data));
    }
    onSubmit() {
        if (this.form.valid) {
            const newRoles = this.form.value.roles.map((item) =>
                typeof item === 'object' ? item.id : item
            );
            this.staffService
                .editStaff(this.staffDetail.id, {
                    ...this.form.value,
                    roles: newRoles,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно отредактировано!');
                    this.dialogRef.close('edit');
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
