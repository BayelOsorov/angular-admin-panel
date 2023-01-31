import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ChangeDetectorRef,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../models/identification/identification';
import { OpenviduComponent } from '../../../openvidu';
import { ApplicationRequestsService } from '../../../services/credit-application/credit.service';
import { HandleErrorService } from '../../../services/http/handle-error.service';
import { IdentificationService } from '../../../services/identification/identification.service';
import {
    cleanEmptyKeyInObj,
    genderEnum,
    IdentificationAnswers,
    maritalStatus,
    residenceLocationEnum,
    translateMaritalStatus,
} from '../../../utils';
@Component({
    selector: 'ngx-identification-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    animations: [
        trigger('openClose', [
            state('true', style({ height: '*' })),
            state('false', style({ height: '0px' })),
            transition('false <=> true', [animate(500)]),
        ]),
    ],
})
export class IdentificationDetailComponent implements OnInit, OnDestroy {
    @Input() data: IIdentificationDetail;
    @Input() personalData: IPersonalData;
    @Input() customerInfo;

    @ViewChild('openvidu', { static: false }) openvidu: OpenviduComponent;
    @Output() getDataEvent = new EventEmitter();
    toggle = false;
    isNeedToEdit = false;
    error = '';
    identificationAnswers = IdentificationAnswers;

    form: FormGroup;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private router: Router,
        private location: Location,
        private http: HttpClient,
        private errorService: HandleErrorService,
        private fb: FormBuilder
    ) {}
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
        this.identificationService
            .sendVideo(this.data.id, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data1) => {
                    console.log(data1);
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
