import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ChangePasswordModalComponent } from './staff/change-password-modal/change-password-modal.component';
import { CreateStaffModalComponent } from './staff/create-staff-modal/create-staff-modal/create-staff-modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
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
import { FeedbacksComponent } from './catalog/partners/feedbacks/feedbacks.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { DetailComponent } from './identification/detail/detail.component';
import { NeedToEditComponent } from './identification/need-to-edit/need-to-edit.component';
import { PhotoIdnButtonsComponent } from './identification/photo-idn-buttons/photo-idn-buttons.component';
import { LightboxImgComponent } from './lightbox-img/lightbox-img.component';
import { UserVideoComponent } from '../openvidu/user-video.component';
import { OpenViduVideoComponent } from '../openvidu/ov-video.component';
import { OpenviduComponent } from '../openvidu';
import { ImgInputComponent } from './img-input/img-input.component';
import { ValidationInputComponent } from './validation-input/validation-input.component';
import { MessengersComponent } from './catalog/partners/messengers/messengers.component';
import { MessengersActionsModalComponent } from './catalog/partners/messengers/messengers-actions-modal/messengers-actions-modal.component';
import { TableComponent } from './table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NbAlertModule,
        NbStepperModule,
        NbCardModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        FormsModule,
        NbButtonModule,
        NbSelectModule,
        NbInputModule,
        NbPopoverModule,
        NbListModule,
        NbDatepickerModule,
        NzPaginationModule,
        NzSelectModule,
        CKEditorModule,
    ],
    declarations: [
        CreateStaffModalComponent,
        EditStaffComponent,
        ChangePasswordModalComponent,
        ConfirmDialogComponent,
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
        FeedbacksComponent,
        PaginationComponent,
        DetailComponent,
        NeedToEditComponent,
        PhotoIdnButtonsComponent,
        LightboxImgComponent,
        OpenviduComponent,
        UserVideoComponent,
        OpenViduVideoComponent,
        ImgInputComponent,
        ValidationInputComponent,
        MessengersComponent,
        MessengersActionsModalComponent,
        TableComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        FeedbacksComponent,
        PaginationComponent,
        DetailComponent,
        NeedToEditComponent,
        PhotoIdnButtonsComponent,
        LightboxImgComponent,
        OpenviduComponent,
        UserVideoComponent,
        OpenViduVideoComponent,
        ImgInputComponent,
        ValidationInputComponent,
        MessengersComponent,
        TableComponent,
    ],
})
export class ComponentsModule {}
