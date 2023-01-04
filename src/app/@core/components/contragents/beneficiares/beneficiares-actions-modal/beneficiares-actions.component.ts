/* eslint-disable brace-style */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'ngx-beneficiares-actions',
    templateUrl: './beneficiares-actions.component.html',
    styleUrls: ['./beneficiares-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiaresActionsComponent
    implements OnInit, OnChanges, OnDestroy
{
    @Output() editEvent = new EventEmitter();
    @Output() createEvent = new EventEmitter();
    @Input() contractorData;
    @Input() contractorId;
    submitted = false;
    form: FormGroup;
    type: string;
    iPform = this.fb.group({
        surname: ['', Validators.required],
        name: ['', Validators.required],
        fatherName: ['', Validators.required],
        birthday: ['', Validators.required],
        birthplace: ['', Validators.required],
        nationality: ['', Validators.required],
        gender: ['', Validators.required],
        citizenship: ['', Validators.required],
        familyStatus: ['', Validators.required],
        passportNo: ['', Validators.required],
        dateOfIssue: ['', Validators.required],
        dateOfExpiration: ['', Validators.required],
        authority: ['', Validators.required],
        pin: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        bankAccount: ['', Validators.required],
        position: ['', Validators.required],
        appointmentDate: ['', Validators.required],
        releaseDate: ['', Validators.required],
        type: ['', Validators.required],
    });
    legalForm = this.fb.group({
        name: ['', Validators.required],
        tin: ['', Validators.required],
        okpo: ['', [Validators.required, Validators.maxLength(256)]],
        legalAddress: ['', [Validators.required, Validators.maxLength(256)]],
        actualAddress: ['', [Validators.required, Validators.maxLength(256)]],
        foundingDate: ['', [Validators.required]],
        manager: ['', [Validators.required, Validators.maxLength(256)]],
        type: ['', Validators.required],
    });
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private toaster: ToastrService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}
    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.contractorData) {
            this.type = this.contractorData.type;
            if (this.type === 'individualBeneficiary') {
                this.form = this.iPform;
                this.form.controls['surname'].setValue(
                    this.contractorData.surname
                );
                this.form.controls['name'].setValue(this.contractorData.name);
                this.form.controls['fatherName'].setValue(
                    this.contractorData.fatherName
                );
                this.form.controls['birthday'].setValue(
                    this.contractorData.birthday
                );
                this.form.controls['birthplace'].setValue(
                    this.contractorData.birthplace
                );
                this.form.controls['nationality'].setValue(
                    this.contractorData.nationality
                );
                this.form.controls['gender'].setValue(
                    this.contractorData.gender
                );
                this.form.controls['citizenship'].setValue(
                    this.contractorData.citizenship
                );
                this.form.controls['familyStatus'].setValue(
                    this.contractorData.familyStatus
                );
                this.form.controls['passportNo'].setValue(
                    this.contractorData.passportNo
                );
                this.form.controls['dateOfIssue'].setValue(
                    this.contractorData.dateOfIssue
                );
                this.form.controls['dateOfExpiration'].setValue(
                    this.contractorData.dateOfExpiration
                );
                this.form.controls['authority'].setValue(
                    this.contractorData.authority
                );
                this.form.controls['pin'].setValue(this.contractorData.pin);
                this.form.controls['phoneNumber'].setValue(
                    this.contractorData.phoneNumber
                );
                this.form.controls['bankAccount'].setValue(
                    this.contractorData.bankAccount
                );
                this.form.controls['position'].setValue(
                    this.contractorData.position
                );
                this.form.controls['appointmentDate'].setValue(
                    this.contractorData.appointmentDate
                );
                this.form.controls['releaseDate'].setValue(
                    this.contractorData.releaseDate
                );
                this.form.controls['type'].setValue(this.contractorData.type);
            }
            if (this.type === 'legalBeneficiary') {
                this.form = this.legalForm;
                this.form.controls['name'].setValue(this.contractorData.name);
                this.form.controls['tin'].setValue(this.contractorData.tin);
                this.form.controls['okpo'].setValue(this.contractorData.okpo);
                this.form.controls['legalAddress'].setValue(
                    this.contractorData.legalAddress
                );
                this.form.controls['actualAddress'].setValue(
                    this.contractorData.actualAddress
                );
                this.form.controls['foundingDate'].setValue(
                    this.contractorData.foundingDate
                );
                this.form.controls['manager'].setValue(
                    this.contractorData.manager
                );
                this.form.controls['type'].setValue(this.contractorData.type);
            }
        }
    }
    onSelect(val) {
        this.type = val;
        if (this.type === 'individualBeneficiary') {
            this.form = this.iPform;
        }
        if (this.type === 'legalBeneficiary') {
            this.form = this.legalForm;
        }
    }
    onSubmit() {
        if (this.form.valid) {
            if (this.contractorData) {
                this.editEvent.emit({
                    contractorId: this.contractorId,
                    beneficiaryId: this.contractorData.id,
                    data: { [this.type]: this.form.value },
                });

                return;
            }
            this.createEvent.emit({
                contractorId: this.contractorId,
                data: { [this.type]: this.form.value },
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
