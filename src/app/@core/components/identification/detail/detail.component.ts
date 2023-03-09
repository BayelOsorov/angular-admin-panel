import { Location } from '@angular/common';
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    OnDestroy,
    Output,
    EventEmitter,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../models/identification/identification';
import { OpenviduComponent } from '../../../openvidu';
import { HandleErrorService } from '../../../services/http/handle-error.service';
import { IdentificationService } from '../../../services/identification/identification.service';
import {
    cleanEmptyKeyInObj,
    genderEnum,
    IdentificationAnswers,
    maritalStatus,
    residenceLocationEnum,
} from '../../../utils';
@Component({
    selector: 'ngx-identification-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class IdentificationDetailComponent implements OnInit, OnDestroy {
    @Input() data: IIdentificationDetail;
    @Input() personalData: IPersonalData;
    @Input() customerInfo;

    @ViewChild('openvidu', { static: false }) openvidu: OpenviduComponent;
    @ViewChild('accordionItem') accordion;
    @Output() getDataEvent = new EventEmitter();
    toggle = false;
    isNeedToEdit = false;
    error = '';
    identificationAnswers = IdentificationAnswers;
    toastrLoader;
    form: FormGroup;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private location: Location,
        private errorService: HandleErrorService,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef
    ) {}
    collapsedChange(val) {
        if (!val) {
            this.getDataEvent.emit();
            this.cdr.detectChanges();
        }
    }
    trackByFn(index, item) {
        return item.id;
    }
    getDataToggle() {
        this.toggle = !this.toggle;
    }
    getGender(val) {
        return genderEnum.find((e) => e.value === val).text;
    }

    approvePhotoIdn() {
        this.identificationService
            .approvePhotoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.success(
                        'Вы успешно подтвердили фотоидентификацию!'
                    );
                    this.location.back();
                },
                error: (err) => {
                    this.error = this.errorService.identificationErrors(err);
                },
            });
    }
    declinePhotoIdn() {
        this.identificationService
            .declinePhotoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.success(
                        'Вы успешно отклонили фотоидентификацию!'
                    );
                    this.location.back();
                },
                error: (err) => {
                    this.error = this.errorService.identificationErrors(err);
                },
            });
    }
    approveVideoIdn() {
        this.identificationService
            .approveVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.success(
                        'Вы успешно подтвердили видеоидентификацию!'
                    );
                    this.location.back();
                },
                error: (err) => {
                    this.error = this.errorService.identificationErrors(err);
                },
            });
    }
    declineVideoIdn() {
        this.identificationService
            .declineVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.success(
                        'Вы успешно отклонили видеоидентификацию!'
                    );
                    this.location.back();
                },
                error: (err) => {
                    this.error = this.errorService.identificationErrors(err);
                },
            });
    }
    suspendVideoIdn() {
        this.identificationService
            .suspendVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.success(
                        'Вы успешно повторно запросили видеоидентификацию!'
                    );
                    this.location.back();
                },
                error: (err) => {
                    this.error = this.errorService.identificationErrors(err);
                },
            });
    }
    editPhotoIdn() {
        if (this.form.valid) {
            if (
                Object.values(this.form.value).find(
                    (item: []) => item.length > 0
                )
            ) {
                this.identificationService
                    .needToEditPhotoIdentification(this.data.id, {
                        editRequiredProperties: cleanEmptyKeyInObj(
                            this.form.value
                        ),
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe({
                        next: () => {
                            this.toastService.success(
                                'Вы успешно отправили на редактирование фотоидентификацию!'
                            );
                            this.location.back();
                        },
                        error: (err) => {
                            this.error =
                                this.errorService.identificationErrors(err);
                        },
                    });
                return;
            }
            this.error = 'Выберите что нужно отредактировать';
            setTimeout(() => {
                this.error = '';
            }, 5000);
        }
    }
    sendComment(data) {
        this.identificationService
            .sendComment(this.data.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.getDataEvent.emit('');
                },
            });
    }

    sendVideo(data) {
        this.toastrLoader = this.toastService.info(
            'Видео загружается, подождите!',
            '',
            {
                timeOut: 10000000,
            }
        );
        this.identificationService
            .sendVideo(this.data.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.toastService.clear();
                    this.toastService.success('Видео успешно загрузилось!');
                },
            });
    }

    hideEdit(bool) {
        this.isNeedToEdit = bool;
    }
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getResidenceLoc(loc) {
        return residenceLocationEnum.find((e) => e.value === loc)?.text;
    }
    closeAlert() {
        this.error = '';
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
