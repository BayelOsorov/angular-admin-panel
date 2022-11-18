import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
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
import { IdentificationService } from '../../../services/identification/identification.service';

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
    toggle = false;
    isNeedToEdit = false;
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private router: Router
    ) {}
    getDataToggle() {
        this.toggle = !this.toggle;
    }
    approvePhotoIdn(data) {
        console.log('dada');

        this.identificationService
            .approvePhotoIdentification(this.data.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success(
                    'Вы успешно подтвердили фотоидентификацию!'
                );
                this.router.navigate(['..']);
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
                this.router.navigate(['..']);
            });
    }
    editPhotoIdn() {
        this.isNeedToEdit = true;
    }
    hideEdit(data) {
        this.isNeedToEdit = data;
    }
    ngOnInit(): void {
        console.log(this.data);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
