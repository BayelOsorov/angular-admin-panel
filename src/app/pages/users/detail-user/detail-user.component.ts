import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationRequestsService } from '../../../@core/services/credit-application/credit.service';
import { UsersService } from '../../../@core/services/users/users.service';
import {
    genderEnum,
    maritalStatus,
    residenceLocationEnum,
    translateIdentificationLevels,
} from '../../../@core/utils';

@Component({
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit, OnDestroy {
    customerData;
    userData;
    applicationId;
    videos;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private creditService: ApplicationRequestsService,
        private usersService: UsersService,
        private route: ActivatedRoute
    ) {}
    getUserDetail(id) {
        this.usersService
            .getDetailUser(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: any) => {
                    this.userData = data;
                    this.getCustomerData(data.userId);
                    this.getVideos(data.userId);
                },
            });
    }
    getCustomerData(id) {
        this.creditService
            .getCustomerData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data) => {
                    this.customerData = data;
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
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getGender(gender) {
        return genderEnum.find((e) => e.value === gender).text;
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
        formData.append('callVideoFile', file);
        formData.append('fileKey', file, file.name);
        console.log(formData);
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
