import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '../../../../services/staff/staff.service';
import { GeneratePassword } from '../../../../utils';
@Component({
    selector: 'ngx-create-staff-modal',
    templateUrl: './create-staff-modal.component.html',
    styleUrls: ['./create-staff-modal.component.scss'],
})
export class CreateStaffModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    searchChange$ = new BehaviorSubject('');
    optionList = [];
    isLoading = false;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService,
        private toaster: ToastrService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            userName: ['', Validators.required],
            roles: [[], [Validators.required]],
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
        });
        const getRoles = (name: string): Observable<any> =>
            this.staffService.getRolesStaff().pipe(
                catchError(() => of({ results: [] })),
                map((res: any) => res)
            );
        const optionList$: Observable<string[]> = this.searchChange$
            .asObservable()
            .pipe(switchMap(getRoles));
        optionList$.subscribe((data) => {
            this.optionList = data;
            this.isLoading = false;
        });
    }
    generatePassword() {
        const password = GeneratePassword();
        this.form.controls['password'].setValue(password);
        this.form.controls['passwordConfirmation'].setValue(password);
    }

    onSubmit() {
        if (this.form.valid) {
            const newRoles = this.form.value.roles.map((item) => item.id);
            this.staffService
                .createStaff({ ...this.form.value, roles: newRoles })
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
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
