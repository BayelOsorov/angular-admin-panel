import { LOCALE_ID, NgModule } from '@angular/core';
import {
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule,
    NbIconDefinition,
    NbIconModule,
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
import { StaffComponent } from './staff/list-staff/staff.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { BrandsComponent } from './catalog/brands/brands.component';
import { ListPartnersComponent } from './catalog/partners/list-partners/list-partners.component';
import { ActionsPartnerComponent } from './catalog/partners/actions-partner/actions-partner.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './catalog/categories/categories.component';
import { ComponentsModule } from '../@core/components/components.module';
import { ListTagsComponent } from './catalog/taggs/list-tags/list-tags.component';
import { ListProductsComponent } from './catalog/products/list-products/list-products.component';
import { DetailPartnerComponent } from './catalog/partners/detail-partner/detail-partner.component';
import { LocalitiesComponent } from './catalog/localities/localities.component';
import { ListMallsComponent } from './catalog/malls/list-malls/list-malls.component';
import { ActionsMallComponent } from './catalog/malls/actions-mall/actions-mall.component';
import { ActionsBrandComponent } from './catalog/brands/actions-brand/actions-brand.component';
import { ListNewsComponent } from './catalog/news/list-news/list-news.component';
import { ActionsNewsComponent } from './catalog/news/actions-news/actions-news.component';
import { ListPartnerPromsComponent } from './catalog/partner-proms/list-partner-proms/list-partner-proms.component';
import { ActionsPartnerPromsComponent } from './catalog/partner-proms/actions-partner-proms/actions-partner-proms.component';
import { ActionsCategoryComponent } from './catalog/categories/actions-category/actions-category.component';
import { ActionsPartnerBranchesComponent } from './catalog/partners/branches/actions-partner-branches/actions-partner-branches.component';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IdentificationGetComponent } from './identification/operator/identification-get/identification-get.component';
import { IdentificationDetailComponent } from './identification/operator/identification-detail/identification-detail.component';
import { PartnerFeedbacksComponent } from './catalog/partner-feedbacks/partner-feedbacks.component';
import { PartnerFeedbacksDetailComponent } from './catalog/partner-feedbacks/detail/partner-feedbacks-detail.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { GetCreditApplicationsComponent } from './credit-applications/credit-specialist/get-credit-applications/get-credit-applications.component';
import { CreditApplicationDetailComponent } from './credit-applications/credit-specialist/detail/detail.component';
import { ListContragentsComponent } from './catalog/contragents/list-contragents/list-contragents.component';
import { ActionsLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-Iegal-contractors/actions-legal-contractors.component';
import { LegalContractorDetailComponent } from './catalog/contragents/legal-contractor/legal-contractor-detail/legal-contractor-detail.component';
import { UseHttpImageSourcePipe } from '../@core/components/shared/secured-image/secured-image.component';
import { InputSearchComponent } from '../@core/components/shared/input-search/input-search.component';
import { ActionsBeneficiaryLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-beneficiary-legal-contractor/actions-beneficiary-legal-contractor.component';

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
    declarations: [
        PagesComponent,
        StaffComponent,
        DetailStaffComponent,
        BrandsComponent,
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
        ListPartnerPromsComponent,
        ActionsPartnerPromsComponent,
        ActionsCategoryComponent,
        ActionsPartnerBranchesComponent,
        IdentificationGetComponent,
        IdentificationDetailComponent,
        PartnerFeedbacksComponent,
        PartnerFeedbacksDetailComponent,
        GetCreditApplicationsComponent,
        CreditApplicationDetailComponent,
        ListContragentsComponent,
        ActionsLegalContractorComponent,
        LegalContractorDetailComponent,
        ActionsBeneficiaryLegalContractorComponent,
    ],
    providers: [
        {
            provide: NB_TIME_PICKER_CONFIG,
            useValue: {},
        },
        { provide: NZ_ICONS, useValue: icons },

        UseHttpImageSourcePipe,
    ],
    exports: [],
})
export class PagesModule {}
