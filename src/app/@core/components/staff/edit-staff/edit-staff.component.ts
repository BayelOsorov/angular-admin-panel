import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
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
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

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
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}
    onSearch(value: string): void {
        this.isLoading = true;
        this.searchChange$.next(value);
    }
    ngOnInit(): void {
        console.log(this.staffDetail);

        this.form = this.fb.group({
            name: [this.staffDetail?.name, Validators.required],
            userName: [this.staffDetail?.userName, Validators.required],
            roles: ['', Validators.required],
        });

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const getRandomNameList = (name: string): Observable<any> =>
            this.staffService.getRolesStaff().pipe(
                catchError(() => of({ results: [] })),
                map((res: any) => res)
            );
        const optionList$: Observable<string[]> = this.searchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getRandomNameList));
        optionList$.subscribe((data) => {
            this.optionList = data;
            this.isLoading = false;
        });
    }
    onFirstSubmit() {
        this.form.markAsDirty();
        console.log(this.form.value);

        // this.dialogRef.close();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
