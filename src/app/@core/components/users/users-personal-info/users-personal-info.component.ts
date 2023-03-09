import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { FuelCardApplicationService } from '../../../services/credit-application/fuel-card.service';
import { IdentificationService } from '../../../services/identification/identification.service';
import {
    checkRolePermission,
    downloadFile,
    genderEnum,
    getFileType,
    maritalStatus,
    residenceLocationEnum,
    translateIdentificationLevels,
} from '../../../utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'ngx-users-personal-info',
    templateUrl: './users-personal-info.component.html',
    styleUrls: ['./users-personal-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPersonalInfoComponent implements OnInit {
    @Input() userData;
    @Output() getDetailUser = new EventEmitter();
    canOfflineIdentificate: boolean;
    alertStatus: string;
    status: string;
    maritalStatus: string;
    residenceLoc: string;
    gender: string;
    document;

    listDocuments = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private authService: AuthService,
        private identificationService: IdentificationService,
        private toastService: ToastrService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ) {}
    trackByFn(index, item) {
        return item.id; // unique id corresponding to the item
    }
    checkPermission() {
        const userAuthData = this.authService.getUserData();
        this.canOfflineIdentificate = checkRolePermission(userAuthData.role, [
            'kyc_underwriter',
        ]);
    }
    dowloadDocument(url) {
        console.log(url);

        downloadFile(
            url,
            this.userData.identificationInformation.surname +
                '-' +
                this.userData.identificationInformation.name
        );
    }
    getUserDocuments() {
        this.identificationService
            .getUserDocuments(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getFiles(data);
            });
    }

    onFileChange(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.document = formData;
    }
    sendUserDocument() {
        this.toastService.info('Файл загружается, подождите!');
        this.identificationService
            .createUserDocument(this.userData.id, this.document)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toastService.success('Файл успешно загрузился!');
                this.getUserDocuments();
            });
    }
    getFiles(files) {
        this.listDocuments = [];
        files.forEach((item) => {
            fetch(item.url, {
                headers: {
                    Authorization:
                        'Bearer ' + this.authService.getAccessToken(),
                    responseType: 'blob',
                },
            })
                .then((res) => res.blob())
                .then((myBlob) => {
                    const blobLink = window.URL.createObjectURL(myBlob);
                    const type = getFileType(item.fileName.split('.')[1]);
                    this.listDocuments.push({
                        url:
                            type === 'document'
                                ? blobLink
                                : this.sanitizer.bypassSecurityTrustResourceUrl(
                                      blobLink
                                  ),
                        type,
                        fileType: item.fileName.split('.')[1],
                        id: Date.now(),
                    });
                    this.cdr.markForCheck();
                });
        });
    }
    offlineIdentificate() {
        this.identificationService
            .offlineIdentificateUser(this.userData.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toastService.success(
                    'Вы успешно офлайн идентифицировали!'
                );
                this.getDetailUser.emit();
                this.cdr.markForCheck();
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
    getMaritalStatus() {
        this.maritalStatus = maritalStatus.find(
            (item) =>
                item.value ===
                this.userData.identificationInformation.maritalStatus
        )?.text;
    }
    getGender() {
        this.gender = genderEnum.find(
            (e) => e.value === this.userData.identificationInformation.gender
        ).text;
    }

    getResidenceLoc() {
        this.residenceLoc = residenceLocationEnum.find(
            (e) =>
                e.value ===
                this.userData.identificationInformation.residenceAddress.region
        )?.text;
    }
    getStatus() {
        this.status = translateIdentificationLevels(
            this.userData.identificationLevel
        );
    }
    ngOnInit(): void {
        this.getMaritalStatus();
        this.getResidenceLoc();
        this.getStatus();
        this.getGender();
        this.getAlertStatus();
        this.checkPermission();
        this.getUserDocuments();
    }
}
