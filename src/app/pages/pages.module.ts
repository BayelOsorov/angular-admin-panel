import { NgModule } from '@angular/core';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconDefinition,
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbPopoverModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbTreeGridModule,
    NB_TIME_PICKER_CONFIG,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../@core/components/components.module';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { UseHttpImageSourcePipe } from '../@core/components/shared/secured-image/secured-image.component';
import { CustomDatePipe } from '../@core/components/shared/date-pipe/date.pipe';
const antDesignIcons = AllIcons as unknown as {
    [key: string]: NbIconDefinition;
};
const icons: NbIconDefinition[] = Object.keys(antDesignIcons).map(
    (key) => antDesignIcons[key]
);
@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbAlertModule,
        NbMenuModule,
        ReactiveFormsModule,
        FormsModule,
        NbCardModule,
        NbListModule,
        NbTreeGridModule,
        NbInputModule,
        NbButtonModule,
        NbSpinnerModule,
        NzPaginationModule,
        NzPopoverModule,
        NzSelectModule,
        NbSelectModule,
        NbTabsetModule,
        NbTimepickerModule,
        ComponentsModule,
        NbDatepickerModule,
        NbPopoverModule,
        NbDateFnsDateModule.forRoot({
            format: 'dd.MM.yyyy',
            parseOptions: { awareOfUnicodeTokens: false },
            formatOptions: { awareOfUnicodeTokens: false },
        }),
        NbTreeGridModule,
        // NbIconModule,
        // NbEvaIconsModule,
    ],
    declarations: [PagesComponent],
    providers: [
        {
            provide: NB_TIME_PICKER_CONFIG,
            useValue: {},
        },

        { provide: NZ_ICONS, useValue: icons },

        UseHttpImageSourcePipe,
        CustomDatePipe,
    ],
})
export class PagesModule {}
