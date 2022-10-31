import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbSelectModule,
    NbTabsetModule,
    NbTreeGridModule,
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
import { SearchSelectComponent } from '../@core/components/search-select/search-select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './catalog/categories/categories.component';
import { ComponentsModule } from '../@core/components/components.module';
import { ListTagsComponent } from './catalog/taggs/list-tags/list-tags.component';
import { ListProductsComponent } from './catalog/products/list-products/list-products.component';
import { DetailPartnerComponent } from './catalog/partners/detail-partner/detail-partner.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
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
        ComponentsModule,
    ],
    declarations: [
        PagesComponent,
        StaffComponent,
        DetailStaffComponent,
        BrandsComponent,
        TableComponent,
        InputSearchComponent,
        // SearchSelectComponent,
        ListPartnersComponent,
        ActionsPartnerComponent,
        CategoriesComponent,
        ListTagsComponent,
        ListProductsComponent,
        DetailPartnerComponent,
    ],
    // schemas: [NO_ERRORS_SCHEMA],
})
export class PagesModule {}
