import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

import { IDetailStaff, IStaffRole } from '../../../models/staff/staff';
import { StaffService } from '../../../services/staff/staff.service';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
    selector: 'ngx-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit, OnDestroy {
    // form: FormGroup;
    // staffDetail: IDetailStaff;
    // roles: IStaffRole[];
    // disabled = false;
    // ShowFilter = false;
    // limitSelection = false;
    // selectedItems = [];
    // dropdownSettings: any = {};
    // private destroy$: Subject<void> = new Subject<void>();
    // constructor(
    //     private fb: FormBuilder,
    //     private staffService: StaffService,
    //     @Optional() private dialogRef: NbWindowRef<any>
    // ) {}
    // ngOnInit(): void {
    //     this.staffService
    //         .getRolesStaff()
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe({
    //             next: (data) => (this.roles = data),
    //         });
    //     this.form = this.fb.group({
    //         name: [this.staffDetail?.name, Validators.required],
    //         userName: [this.staffDetail?.userName, Validators.required],
    //         roles: this.staffDetail?.roles,
    //     });

    //     this.dropdownSettings = {
    //         singleSelection: false,
    //         idField: 'id',
    //         textField: 'title',
    //         nameField: 'name',
    //         normNameField: 'normalizedName',
    //         concurrencyStampField: 'concurrencyStamp',
    //         selectAllText: 'Выбрать все',
    //         unSelectAllText: 'Отменить',
    //         allowSearchFilter: true,
    //         clearSearchFilter: true,
    //     };
    // }
    // onFirstSubmit() {
    //     this.form.markAsDirty();
    //     console.log(this.form.value.roles);
    //     this.staffService
    //         .editStaff(this.staffDetail.id, this.form.value)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe((data) => {
    //             console.log(data);
    //         });
    //     // this.dialogRef.close();
    // }

    // onItemSelect(item: any) {
    //     console.log(item);
    // }
    // onSelectAll(items: any) {
    //     console.log(items);
    // }
    // ngOnDestroy() {
    //     this.destroy$.next();
    //     this.destroy$.complete();
    // }

    // toogleShowFilter() {
    //     this.ShowFilter = !this.ShowFilter;
    //     this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
    //         allowSearchFilter: this.ShowFilter,
    //     });
    // }

    // handleLimitSelection() {
    //     if (this.limitSelection) {
    //         this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
    //             limitSelection: 2,
    //         });
    //     } else {
    //         this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
    //             limitSelection: null,
    //         });
    //     }
    // }

    form: FormGroup;
    staffDetail: IDetailStaff;
    searchChange$ = new BehaviorSubject('');
    optionList = [];
    selectedUser?: string;
    isLoading = false;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder, private staffService: StaffService) {}

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);
    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.staffDetail?.name, Validators.required],
            userName: [this.staffDetail?.userName, Validators.required],
            roles: [this.staffDetail?.roles],
        });
        const getRandomNameList = (name: string): Observable<any> =>
            this.staffService.getRolesStaff().pipe(
                catchError(() => of({ results: [] })),
                map((res: any) => res)
            );
        const optionList$: Observable<string[]> = this.searchChange$
            .asObservable()
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
