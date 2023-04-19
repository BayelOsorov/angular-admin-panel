import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
    NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbAccordionModule,
    NbAlertModule,
    NbBadgeModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbPopoverModule,
    NbSelectModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbTreeGridModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ValidationInputComponent } from './shared/validation-input/validation-input.component';
import { TableComponent } from './shared/table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';

// Load Widgets
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

// Load FusionTheme Theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { DemoNgZorroAntdModule } from '../utils/ng-zorro-antd.module';
import { PhoneNumberInputComponent } from './shared/phone-number-input/phone-number-input.component';
import { FusionChartComponent } from './shared/fusion-chart/fusion-chart.component';
import { ImgInputComponent } from './shared/img-input/img-input.component';
import { MultipleSearchSelectComponent } from './shared/multiple-search-select/multiple-search-select.component';
import { CustomMapComponent } from './shared/custom-map/custom-map.component';
import { AvatarImgComponent } from './shared/avatar-img/avatar-img.component';
import { EditorComponent } from './shared/editor/editor.component';
import { LocalizationInputsComponent } from './shared/localization-inputs/localization-inputs.component';
import { SearchSelectComponent } from './shared/search-select/search-select.component';
import { UseHttpImageSourcePipe } from './shared/secured-image/secured-image.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { LightboxImgComponent } from './shared/lightbox-img/lightbox-img.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { StatusBadgeComponent } from './shared/status-badge/status-badge.component';
import { NbMomentDateModule } from '@nebular/moment';
import { OrderByPipe } from './shared/order-by-pipe/order-by.pipe';
import { GlobalLoaderComponent } from './shared/global-loader/global-loader.component';
import { BtnLoaderComponent } from './shared/btn-loader/btn-loader.component';
import { InputSearchComponent } from './shared/input-search/input-search.component';
import { CustomDatePipe } from './shared/date-pipe/date.pipe';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

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
        NbTreeGridModule,
        FusionChartsModule,
        NbAccordionModule,
        NbTabsetModule,
        NbIconModule,
        NzSliderModule,
        DemoNgZorroAntdModule,
        NbEvaIconsModule,
        NbBadgeModule,
        NzResultModule,
        NbCheckboxModule,
        NbMomentDateModule,
        NbSpinnerModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        UseHttpImageSourcePipe,
        SearchSelectComponent,
        LocalizationInputsComponent,
        MultipleSearchSelectComponent,
        CustomMapComponent,
        AvatarImgComponent,
        EditorComponent,
        PaginationComponent,
        LightboxImgComponent,
        ImgInputComponent,
        ValidationInputComponent,
        TableComponent,
        FusionChartComponent,
        PhoneNumberInputComponent,
        StatusBadgeComponent,
        OrderByPipe,
        GlobalLoaderComponent,
        BtnLoaderComponent,
        InputSearchComponent,
        CustomDatePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [
        ConfirmDialogComponent,
        SearchSelectComponent,
        LocalizationInputsComponent,
        MultipleSearchSelectComponent,
        UseHttpImageSourcePipe,
        CustomMapComponent,
        AvatarImgComponent,
        EditorComponent,
        PaginationComponent,
        LightboxImgComponent,
        ImgInputComponent,
        ValidationInputComponent,
        TableComponent,
        FusionChartComponent,
        PhoneNumberInputComponent,
        StatusBadgeComponent,
        OrderByPipe,
        GlobalLoaderComponent,
        BtnLoaderComponent,
        InputSearchComponent,
        CustomDatePipe,
    ],
    providers: [
        // set up the providers
    ],
})
export class ComponentsModule {}
