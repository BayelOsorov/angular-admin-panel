import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IIdentificationDetail } from '../../../models/identification/identification';
import { IdentificationService } from '../../../services/identification/identification.service';

@Component({
    selector: 'ngx-identification-need-to-edit',
    templateUrl: './need-to-edit.component.html',
    styleUrls: ['./need-to-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedToEditComponent implements OnInit, OnDestroy {
    @Input() isNeedToEdit;
    @Input() data: IIdentificationDetail;

    @Output() hideEditEvent = new EventEmitter();

    form: FormGroup;

    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private router: Router
    ) {}
    hide() {
        this.hideEditEvent.emit(false);
    }
    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.identificationService
                .needToEditPhotoIdentification(this.data.id, {
                    editRequiredProperties: this.form.value,
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toastService.success(
                        'Вы успешно отправили на редактирование фотоидентификацию!'
                    );
                    this.router.navigate(['..']);
                });
        }
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            PassportFrontSideImageId: [[]],
            PassportBackSideImageId: [[]],
            Address: [[]],
            Pin: [[]],
            SelfieWithPassportImageId: [[]],
            DocumentNumber: [[]],
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
