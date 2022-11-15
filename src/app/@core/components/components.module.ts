import {
    CUSTOM_ELEMENTS_SCHEMA,
    forwardRef,
    NgModule,
    NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbListModule,
    NbPopoverModule,
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
import { GalleryComponent } from './catalog/partners/gallery/gallery.component';
import { ImageActionsModalComponent } from './catalog/partners/image-actions-modal/image-actions-modal.component';
import { LocalityActionsModalComponent } from './catalog/locality/locality-actions-modal/locality-actions-modal.component';
import { CustomMapComponent } from './custom-map/custom-map.component';
import { AvatarImgComponent } from './avatar-img/avatar-img.component';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BranchesComponent } from './catalog/partners/branches/branches.component';
import { RouterModule } from '@angular/router';
import { WeekdaysComponent } from './catalog/partners/branches/weekdays/weekdays.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NbAlertModule,
        NbStepperModule,
        NbCardModule,
        ReactiveFormsModule,
        FormsModule,
        NbButtonModule,
        NbSelectModule,
        NbInputModule,
        NbPopoverModule,
        NbListModule,
        NgMultiSelectDropDownModule,
        NbDatepickerModule,
        NzSelectModule,
        CKEditorModule,
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
        GalleryComponent,
        ImageActionsModalComponent,
        LocalityActionsModalComponent,
        CustomMapComponent,
        AvatarImgComponent,
        EditorComponent,
        BranchesComponent,
        WeekdaysComponent,
    ],
    // schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        ConfirmDialogComponent,
        SearchSelectComponent,
        LocalizationInputsComponent,
        MultipleSearchSelectComponent,
        GalleryComponent,
        UseHttpImageSourcePipe,
        CustomMapComponent,
        AvatarImgComponent,
        EditorComponent,
        BranchesComponent,
        WeekdaysComponent,
    ],
})
export class ComponentsModule {}
