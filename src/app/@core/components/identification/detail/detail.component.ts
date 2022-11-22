import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IIdentificationDetail,
    IPersonalData,
} from '../../../models/identification/identification';
import { OpenviduComponent } from '../../../openvidu';
import { IdentificationService } from '../../../services/identification/identification.service';
import { translateMaritalStatus } from '../../../utils';

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
export class DetailComponent implements OnInit, OnDestroy {
    @Input() data: IIdentificationDetail;
    @Input() personalData: IPersonalData;
    @ViewChild('openvidu', { static: false }) openvidu: OpenviduComponent;
    toggle = false;
    isNeedToEdit = false;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private router: Router,
        private location: Location
    ) {}
    getDataToggle() {
        this.toggle = !this.toggle;
    }
    approvePhotoIdn() {
        this.identificationService
            .approvePhotoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно подтвердили фотоидентификацию!'
                );
                this.location.back();
            });
    }
    declinePhotoIdn() {
        this.identificationService
            .declinePhotoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно отклонили фотоидентификацию!'
                );
                this.location.back();
            });
    }
    approveVideoIdn() {
        this.identificationService
            .approveVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно подтвердили видеоидентификацию!'
                );
                this.location.back();
            });
    }
    declineVideoIdn() {
        this.identificationService
            .declineVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно отклонили видеоидентификацию!'
                );
                this.location.back();
            });
    }
    suspendVideoIdn() {
        this.identificationService
            .suspendVideoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно повторно запросили видеоидентификацию!'
                );
                // this.location.back();
            });
    }
    editPhotoIdn() {
        this.isNeedToEdit = true;
    }
    hideEdit(bool) {
        this.isNeedToEdit = bool;
    }
    translate(str) {
        return translateMaritalStatus(str);
    }
    ngOnInit(): void {}
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
