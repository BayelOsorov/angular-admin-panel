import {
    Component,
    Injector,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ChangePasswordModalComponent } from '../../../@core/components/staff/change-password-modal/change-password-modal.component';
import { EditStaffComponent } from '../../../@core/components/staff/edit-staff/edit-staff.component';
import { IDetailStaff } from '../../../@core/models/staff/staff';
import { StaffService } from '../../../@core/services/staff/staff.service';
@Component({
    templateUrl: './detail-staff.component.html',
    styleUrls: ['./detail-staff.component.scss'],
})
export class DetailStaffComponent implements OnInit, OnDestroy {
    @ViewChild('disabledEsc', { read: TemplateRef, static: true })
    disabledEscTemplate: TemplateRef<HTMLElement>;

    subscription: Subscription;
    staffId: string;
    staffDetail: IDetailStaff;

    customColumn = 'name';
    defaultColumns = ['size', 'kind', 'items'];
    allColumns = [this.customColumn, ...this.defaultColumns];
    constructor(
        private staffService: StaffService,
        private route: ActivatedRoute,
        private windowService: NbWindowService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.staffId = params['id'];
        });
        this.getStaffDetail();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    openEditModal() {
        this.openModal(false, EditStaffComponent, {
            title: 'Редактирование сотрудника',
            context: {
                staffDetail: this.staffDetail,
            },
        });
    }
    openChangePassModal() {
        this.openModal(false, ChangePasswordModalComponent, {
            title: 'Изменения пароля',
            context: {
                staffId: this.staffId,
            },
        });
    }
    getStaffDetail() {
        this.subscription = this.staffService
            .getDetailStaff(this.staffId)
            .subscribe({
                next: (data) => (this.staffDetail = data),
            });
    }
    protected openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) => val === 'edit' && this.getStaffDetail()
            );
    }
}
