import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerBonusesService } from '../../../../services/bonuses/partner-bonuses.service';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
import { OldBackendService } from '../../../../services/old-backend/old-backend.service';
@Component({
    selector: 'ngx-create-partner-bonuse',
    templateUrl: './create-partner-bonuse.component.html',
    styleUrls: ['./create-partner-bonuse.component.scss'],
})
export class CreatePartnerBonuseComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    submitted = false;
    partners = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnerBonuses: PartnerBonusesService,
        private oldBackService: OldBackendService,

        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            contractorId: ['', [Validators.required]],
        });
    }
    getPartners(val) {
        this.oldBackService
            .getListPartners(val)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: any) => {
                this.partners = res.items;
            });
    }
    onFirstSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            this.partnerBonuses
                .createContractor(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (res) => {
                        this.toaster.success('Успешно создано!');
                        this.dialogRef.close('edit');
                    },
                    error: (err) => {
                        console.log(err);
                        if (err.status === 404) {
                            this.toaster.error(
                                'Данный пользователь не участвует в реферальной программе!'
                            );
                        }
                    },
                });
            return;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
