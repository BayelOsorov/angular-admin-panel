import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IDetailStaff } from '../../../models/staff/staff';

@Component({
    selector: 'ngx-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit, OnDestroy {
    @Input() staffDetail: IDetailStaff;
    form: FormGroup;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            firstCtrl: ['', Validators.required],
            secondCtrl: ['', Validators.required],
        });

        console.log(this.staffDetail);
    }
    onFirstSubmit() {
        //    .pipe(
        //                 takeUntil(this.destroy$)
        //             )
    }
    ngOnDestroy() {
        // this.destroy$.next();
        // this.destroy$.complete();
    }
}
