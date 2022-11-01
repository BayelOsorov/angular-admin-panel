import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

import { IDetailStaff } from '../../../models/staff/staff';
import { StaffService } from '../../../services/staff/staff.service';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'ngx-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit, OnDestroy {
    form: FormGroup;
    staffDetail: IDetailStaff;
    searchChange$ = new BehaviorSubject('');
    optionList = [];
    selectedUser?: string;
    isLoading = false;

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
            name: [this.staffDetail?.name, Validators.required],
            userName: [this.staffDetail?.userName, Validators.required],
            roles: [[this.staffDetail?.roles], [Validators.required]],
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

    onFirstSubmit() {
        if (this.form.valid) {
            const newRoles = this.form.value.roles.map((item) => item.id);
            this.staffService
                .editStaff(this.staffDetail.id, {
                    ...this.form.value,
                    roles: newRoles,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
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
