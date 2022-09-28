import { NgModule } from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbMenuModule,
    NbTreeGridModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { StaffComponent } from './staff/list-staff/staff.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff/detail-staff.component';
import { ComponentsModule } from '../@core/components/components.module';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        Ng2SmartTableModule,
        NbCardModule,
        NbListModule,
        NbTreeGridModule,
        NbButtonModule,
        ComponentsModule,
    ],
    declarations: [PagesComponent, StaffComponent, DetailStaffComponent],
})
export class PagesModule {}
