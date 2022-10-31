import {
    CUSTOM_ELEMENTS_SCHEMA,
    forwardRef,
    NgModule,
    NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    NbStepperModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditStaffComponent } from './staff/edit-staff/edit-staff.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChangePasswordModalComponent } from './staff/change-password-modal/change-password-modal.component';
import { CreateStaffModalComponent } from './staff/create-staff-modal/create-staff-modal/create-staff-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { BrandActionsModalComponent } from './catalog/brand/brand-actions-modal/brand-actions-modal.component';
import { CategoryActionsModalComponent } from './catalog/category/category-actions-modal/category-actions-modal.component';
import { UseHttpImageSourcePipe } from './secured-image/secured-image.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { LocalizationInputsComponent } from './localization-inputs/localization-inputs.component';
import { TagActionsModalComponent } from './catalog/tag/tag-actions-modal/tag-actions-modal.component';
import { ProductActionsModalComponent } from './catalog/product/product-actions-modal/product-actions-modal.component';
import { MultipleSearchSelectComponent } from './multiple-search-select/multiple-search-select.component';

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
        NbDatepickerModule,
        NzSelectModule,
    ],
    declarations: [
        CreateStaffModalComponent,
        EditStaffComponent,
        ChangePasswordModalComponent,
        ConfirmDialogComponent,
        BrandActionsModalComponent,
        CategoryActionsModalComponent,
        UseHttpImageSourcePipe,
        SearchSelectComponent,
        LocalizationInputsComponent,
        TagActionsModalComponent,
        ProductActionsModalComponent,
        MultipleSearchSelectComponent,
    ],
    // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        ConfirmDialogComponent,
        SearchSelectComponent,
        LocalizationInputsComponent,
        MultipleSearchSelectComponent,
    ],
})
export class ComponentsModule {}
