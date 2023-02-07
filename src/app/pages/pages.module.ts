import {
    CUSTOM_ELEMENTS_SCHEMA,
    LOCALE_ID,
    NgModule,
    NO_ERRORS_SCHEMA,
} from '@angular/core';
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
import { CreditApplicationDetailComponent } from './credit-applications/credit-specialist/0-0-3/detail/detail.component';
import { ListContragentsComponent } from './catalog/contragents/list-contragents/list-contragents.component';
import { ActionsLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-Iegal-contractors/actions-legal-contractors.component';
import { LegalContractorDetailComponent } from './catalog/contragents/legal-contractor/legal-contractor-detail/legal-contractor-detail.component';
import { UseHttpImageSourcePipe } from '../@core/components/shared/secured-image/secured-image.component';
import { InputSearchComponent } from '../@core/components/shared/input-search/input-search.component';
import { ActionsBeneficiaryLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-beneficiary-legal-contractor/actions-beneficiary-legal-contractor.component';
import { SupporCenterCategoriesListComponent } from './support-center/categories/list-categories/suppor-center-categories-list/suppor-center-categories-list.component';
import { SupportCenterProductsListComponent } from './support-center/products/list-products/support-center-products-list/support-center-products-list.component';
import { SupportCenterCategoryDetailComponent } from './support-center/categories/detail-category/support-center-category-detail/support-center-category-detail.component';
import { SupportCenterAnswersActionsComponent } from './support-center/answers-actions/support-center-answers-actions/support-center-answers-actions.component';
import { SupportCenterProductDetailComponent } from './support-center/products/detail-product/support-center-product-detail/support-center-product-detail.component';
import { PartnerIdentificationComponent } from './catalog/partner-identification/list/partner-identification.component';
import { PartnerIdentificationDetailComponent } from './catalog/partner-identification/detail/detail.component';
import { FuelCardApplicationDetailComponent } from './credit-applications/credit-specialist/fuel-card/detail/detail.component';
import { CreditApplicationListAdminComponent } from './credit-applications/admin/0-0-3/credit-application-list/credit-application-list.component';
import { CreditApplicationContainerComponent } from './credit-applications/credit-application-container/credit-application-container.component';
import { DetailCreditApplicationAdminComponent } from './credit-applications/admin/0-0-3/detail-credit-application/detail-credit-application.component';
import { ListFuelCardApplicationsAdminComponent } from './credit-applications/admin/fuel-card/list-fuel-card-applications/list-fuel-card-applications.component';
import { DetailFuelCardApplicationAdminComponent } from './credit-applications/admin/fuel-card/detail-fuel-card-application/detail-fuel-card-application.component';
import { DetailIncreaseLimitApplicationComponent } from './credit-applications/credit-specialist/increase-limit/detail-increase-limit-application/detail-increase-limit-application.component';
import { ListIncreaseLimitApplicationsAdminComponent } from './credit-applications/admin/increase-limit/list-increase-limit-applications/list-increase-limit-applications.component';
import { DetailIncreaseLimitApplicationAdminComponent } from './credit-applications/admin/increase-limit/detail-increase-limit-application/detail-increase-limit-application.component';
import { ListSalespeopleComponent } from './staff/salespeople/list-salespeople/list-salespeople.component';
import { DetailSalespeopleComponent } from './staff/salespeople/detail-salespeople/detail-salespeople.component';
import { ListPartnerNewsComponent } from './catalog/partner-news/list-partner-news/list-partner-news.component';
import { ActionsPartnerNewsComponent } from './catalog/partner-news/actions-partner-news/actions-partner-news.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../@core/interceptors/loader-interceptor';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { ListPartnerBonusesComponent } from './bonuses/partners/list-partner-bonuses/list-partner-bonuses.component';
import { DetailPartnerBonusesComponent } from './bonuses/partners/detail-partner-bonuses/detail-partner-bonuses.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

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
        NgxDocViewerModule,
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
        SupporCenterCategoriesListComponent,
        SupportCenterProductsListComponent,
        SupportCenterCategoryDetailComponent,
        SupportCenterAnswersActionsComponent,
        SupportCenterProductDetailComponent,
        PartnerIdentificationComponent,
        PartnerIdentificationDetailComponent,
        FuelCardApplicationDetailComponent,
        CreditApplicationListAdminComponent,
        CreditApplicationContainerComponent,
        DetailCreditApplicationAdminComponent,
        ListFuelCardApplicationsAdminComponent,
        DetailFuelCardApplicationAdminComponent,
        DetailIncreaseLimitApplicationComponent,
        ListIncreaseLimitApplicationsAdminComponent,
        DetailIncreaseLimitApplicationAdminComponent,
        ListSalespeopleComponent,
        DetailSalespeopleComponent,
        ListPartnerNewsComponent,
        ActionsPartnerNewsComponent,
        ListUsersComponent,
        DetailUserComponent,
        ListPartnerBonusesComponent,
        DetailPartnerBonusesComponent,
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
