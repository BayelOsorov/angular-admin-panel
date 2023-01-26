import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SalespeopleService } from '../../../services/staff/salespeople.service';
@Component({
    selector: 'ngx-create-seller',
    templateUrl: './create-seller.component.html',
    styleUrls: ['./create-seller.component.scss'],
})
export class CreateSellerComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    submitted = false;
    customers;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private salespeopleService: SalespeopleService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            userId: ['', [Validators.required, Validators.maxLength(256)]],
        });
    }
    getCustomers(val) {
        this.salespeopleService
            .getUserByPhoneNumber(val)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                console.log(res);
            });
    }
    onFirstSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            this.salespeopleService
                .createSalesperson(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно отредактировано!');
                    this.dialogRef.close('edit');
                });
            return;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
