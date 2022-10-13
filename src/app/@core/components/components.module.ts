import { forwardRef, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    NbStepperModule,
} from '@nebular/theme';
import {
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';

import { EditStaffComponent } from './staff/edit-staff/edit-staff.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChangePasswordModalComponent } from './staff/change-password-modal/change-password-modal.component';
import { CreateStaffModalComponent } from './staff/create-staff-modal/create-staff-modal/create-staff-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        NbStepperModule,
        NbCardModule,
        ReactiveFormsModule,
        FormsModule,
        NbButtonModule,
        NbSelectModule,
        NbInputModule,
        NbListModule,
        NgMultiSelectDropDownModule,
        NzSelectModule,
    ],
    declarations: [
        CreateStaffModalComponent,
        EditStaffComponent,
        ChangePasswordModalComponent,
        ConfirmDialogComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [ConfirmDialogComponent],
})
export class ComponentsModule {}
