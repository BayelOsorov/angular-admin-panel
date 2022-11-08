import { NgModule } from '@angular/core';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbSelectModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbTreeGridModule,
    NB_TIME_PICKER_CONFIG,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { StaffComponent } from './staff/list-staff/staff.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { BrandsComponent } from './catalog/brands/brands.component';
import { TableComponent } from '../@core/components/table/table.component';
import { InputSearchComponent } from '../@core/components/input-search/input-search.component';
import { ListPartnersComponent } from './catalog/partners/list-partners/list-partners.component';
import { ActionsPartnerComponent } from './catalog/partners/actions-partner/actions-partner.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './catalog/categories/categories.component';
import { ComponentsModule } from '../@core/components/components.module';
import { ListTagsComponent } from './catalog/taggs/list-tags/list-tags.component';
import { ListProductsComponent } from './catalog/products/list-products/list-products.component';
import { DetailPartnerComponent } from './catalog/partners/detail-partner/detail-partner.component';
import { UseHttpImageSourcePipe } from '../@core/components/secured-image/secured-image.component';
import { LocalitiesComponent } from './catalog/localities/localities.component';
import { ListMallsComponent } from './catalog/malls/list-malls/list-malls.component';
import { ActionsMallComponent } from './catalog/malls/actions-mall/actions-mall.component';
import { ActionsBrandComponent } from './catalog/brands/actions-brand/actions-brand.component';
import { ListNewsComponent } from './catalog/news/list-news/list-news.component';
import { ActionsNewsComponent } from './catalog/news/actions-news/actions-news.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbAlertModule,
        NbMenuModule,
        ReactiveFormsModule,
        FormsModule,
        Ng2SmartTableModule,
        NbCardModule,
        NbListModule,
        NbTreeGridModule,
        NbInputModule,
        NbButtonModule,
        NzPaginationModule,
        NzPopoverModule,
        NzSelectModule,
        NbSelectModule,
        NbTabsetModule,
        NbTimepickerModule,
        ComponentsModule,
    ],
    declarations: [
        PagesComponent,
        StaffComponent,
        DetailStaffComponent,
        BrandsComponent,
        TableComponent,
        InputSearchComponent,
        ListPartnersComponent,
        ActionsPartnerComponent,
        CategoriesComponent,
        ListTagsComponent,
        ListProductsComponent,
        DetailPartnerComponent,
        LocalitiesComponent,
        ListMallsComponent,
        ActionsMallComponent,
        ActionsBrandComponent,
        ListNewsComponent,
        ActionsNewsComponent,
    ],
    providers: [
        {
            provide: NB_TIME_PICKER_CONFIG,
            useValue: {},
        },
        UseHttpImageSourcePipe,
    ],
})
export class PagesModule {}
