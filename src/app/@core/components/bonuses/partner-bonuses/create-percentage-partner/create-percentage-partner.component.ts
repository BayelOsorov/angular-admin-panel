import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerBonusesService } from '../../../../services/bonuses/partner-bonuses.service';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
@Component({
    selector: 'ngx-create-percentage-partner',
    templateUrl: './create-percentage-partner.component.html',
    styleUrls: ['./create-percentage-partner.component.scss'],
})
export class CreatePercentagePartnerComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    submitted = false;
    partners = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnerBonuses: PartnerBonusesService,

        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            activeSince: ['', [Validators.required]],
            value: ['', [Validators.required]],
        });
    }

    onFirstSubmit() {
        this.submitted = true;

        if (this.form.valid) {
            this.partnerBonuses
                .createContractorPercentage(this.itemData.id, this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (res) => {
                        this.toaster.success('Успешно создано!');
                        this.dialogRef.close('edit');
                    },
                    error: (err) => {},
                });
            return;
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
