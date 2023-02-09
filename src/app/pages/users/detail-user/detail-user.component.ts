import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../@core/services/auth/auth.service';
import { ApplicationRequestsService } from '../../../@core/services/credit-application/credit.service';
import { FuelCardApplicationService } from '../../../@core/services/credit-application/fuel-card.service';
import { IdentificationService } from '../../../@core/services/identification/identification.service';
import { UsersService } from '../../../@core/services/users/users.service';
import {
    genderEnum,
    maritalStatus,
    residenceLocationEnum,
    translateIdentificationLevels,
} from '../../../@core/utils';
import * as mammoth from 'mammoth';
@Component({
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit, OnDestroy {
    userData;
    applicationId;
    videos;
    document;
    listDocuments = [];
    alertStatus;
    fuelCardCreditLineData;
    public loadDelay = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private creditService: ApplicationRequestsService,
        private usersService: UsersService,
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private authService: AuthService,
        private fuelCardService: FuelCardApplicationService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}
    getUserDetail(id) {
        this.usersService
            .getDetailUser(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: any) => {
                    this.userData = data;

                    this.getVideos(data.id);
                    this.getFuelCardCreditLineStatus();
                    this.getUserDocuments();
                    this.getAlertStatus();
                },
            });
    }

    getVideos(id) {
        this.creditService
            .getCustomerVideoCalls(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.videos = res;
            });
    }
    getAlertStatus() {
        switch (this.userData.identificationLevel.toLowerCase()) {
            case 'online':
                this.alertStatus = 'primary';
                break;
            case 'offline':
                this.alertStatus = 'success';
                return;
            case 'none':
                this.alertStatus = 'basic';
                return;
            default:
                break;
        }
    }
    offlineIdentificate() {
        this.identificationService
            .offlineIdentificateUser(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toastService.success(
                    'Вы успешно оффлайн идентифицировали!'
                );
                this.getUserDetail(this.userData.id);
            });
    }
    closeFuelCardCreditLine() {
        this.fuelCardService
            .closeFuelCardCreditLine(
                this.fuelCardCreditLineData.creditLineDetails.id
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toastService.success(
                    'Вы успешно закрыли топливную карту!'
                );
                this.getFuelCardCreditLineStatus();
            });
    }
    getFuelCardCreditLineStatus() {
        this.fuelCardService
            .getFuelCardCreditLineStatus(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.fuelCardCreditLineData = data;
            });
    }
    sendUserDocument() {
        this.toastService.info('Файл загружается, подождите!');
        this.identificationService
            .createUserDocument(this.userData.id, this.document)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toastService.success('Файл успешно загрузился!');
                this.getUserDocuments();
            });
    }
    getFiles(files) {
        this.listDocuments = [];
        files.forEach((link) => {
            fetch(link, {
                headers: {
                    Authorization:
                        'Bearer ' + this.authService.getAccessToken(),
                    responseType: 'blob',
                },
            })
                .then((res) => res.blob())
                .then((myBlob) => {
                    const blobLink = window.URL.createObjectURL(myBlob);

                    this.listDocuments.push({
                        url: this.sanitizer.bypassSecurityTrustResourceUrl(
                            blobLink
                        ),
                        type: myBlob.type,
                    });
                });
        });
    }

    getUserDocuments() {
        this.identificationService
            .getUserDocuments(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                // this.listDocuments = data;
                this.getFiles(data);
            });
    }
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getGender(gender) {
        return genderEnum.find((e) => e.value === gender).text;
    }
    isImage(type) {
        return type.split('/')[0] === 'image';
    }
    getResidenceLoc(loc) {
        return residenceLocationEnum.find((e) => e.value === loc)?.text;
    }
    getStatus(status) {
        return translateIdentificationLevels(status);
    }
    onFileChange(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.document = formData;
    }
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.applicationId = params['id'];
            this.getUserDetail(this.applicationId);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
