import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { StaffComponent } from './staff/list-staff/staff.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { BrandsComponent } from './catalog/brands/brands.component';
import { ListPartnersComponent } from './catalog/partners/list-partners/list-partners.component';
import { ActionsPartnerComponent } from './catalog/partners/actions-partner/actions-partner.component';
import { CategoriesComponent } from './catalog/categories/categories.component';
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
import { IdentificationGetComponent } from './identification/operator/identification-get/identification-get.component';
import { IdentificationDetailComponent } from './identification/operator/identification-detail/identification-detail.component';
import { PartnerFeedbacksService } from '../@core/services/catalog/partner-feedbacks/partner-feedbacks.service';
import { PartnerFeedbacksComponent } from './catalog/partner-feedbacks/partner-feedbacks.component';
import { PartnerFeedbacksDetailComponent } from './catalog/partner-feedbacks/detail/partner-feedbacks-detail.component';
import { PermissionsGuard } from '../@core/guards/permissions/permissions.guard';
import { GetCreditApplicationsComponent } from './credit-applications/credit-specialist/get-credit-applications/get-credit-applications.component';
import { CreditApplicationDetailComponent } from './credit-applications/credit-specialist/0-0-3/detail/detail.component';
import { ListContragentsComponent } from './catalog/contragents/list-contragents/list-contragents.component';
import { ActionsLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-Iegal-contractors/actions-legal-contractors.component';
import { LegalContractorDetailComponent } from './catalog/contragents/legal-contractor/legal-contractor-detail/legal-contractor-detail.component';
import { ActionsBeneficiaryLegalContractorComponent } from './catalog/contragents/legal-contractor/actions-beneficiary-legal-contractor/actions-beneficiary-legal-contractor.component';
import { SupporCenterCategoriesListComponent } from './support-center/categories/list-categories/suppor-center-categories-list/suppor-center-categories-list.component';
import { SupportCenterProductsListComponent } from './support-center/products/list-products/support-center-products-list/support-center-products-list.component';
import { SupportCenterCategoryDetailComponent } from './support-center/categories/detail-category/support-center-category-detail/support-center-category-detail.component';
import { SupportCenterAnswersActionsComponent } from './support-center/answers-actions/support-center-answers-actions/support-center-answers-actions.component';
import { SupportCenterProductDetailComponent } from './support-center/products/detail-product/support-center-product-detail/support-center-product-detail.component';
import { FullSizeSocialFundComponent } from '../@core/components/credit-application/soc-fond/full-size-social-fund/full-size-social-fund.component';
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
import { ListPartnerNewsComponent } from './catalog/partner-news/list-partner-news/list-partner-news.component';
import { ActionsPartnerNewsComponent } from './catalog/partner-news/actions-partner-news/actions-partner-news.component';
import { DetailSalespeopleComponent } from './staff/salespeople/detail-salespeople/detail-salespeople.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ListPartnerBonusesComponent } from './bonuses/partners/list-partner-bonuses/list-partner-bonuses.component';
import { DetailPartnerBonusesComponent } from './bonuses/partners/detail-partner-bonuses/detail-partner-bonuses.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // ! staff
            {
                path: 'staff',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin'] },
                component: StaffComponent,
            },
            {
                path: 'staff-detail/:id',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin'] },
                component: DetailStaffComponent,
            },
            {
                path: 'salespeople',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin'] },
                children: [
                    {
                        path: '',
                        component: ListSalespeopleComponent,
                    },
                    {
                        path: 'detail/:id',
                        component: DetailSalespeopleComponent,
                    },
                ],
            },
            // ! Users
            {
                path: 'users',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'credit_specialist', 'collector'] },
                children: [
                    {
                        path: 'list',
                        component: ListUsersComponent,
                    },
                    {
                        path: 'detail/:id',
                        component: DetailUserComponent,
                    },
                ],
            },
            // ! Bonuses
            {
                path: 'bonuses',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'underwriter', 'accountant'] },
                children: [
                    {
                        path: 'partners',
                        canActivate: [PermissionsGuard],
                        data: { roles: ['admin', 'underwriter'] },
                        children: [
                            {
                                path: 'list',
                                component: ListPartnerBonusesComponent,
                            },
                            {
                                path: 'detail/:id',
                                component: DetailPartnerBonusesComponent,
                            },
                        ],
                    },
                ],
            },
            // ! Support Center
            {
                path: 'support-center',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'manager', 'underwriter'] },
                children: [
                    {
                        path: 'categories',
                        children: [
                            {
                                path: 'list',
                                component: SupporCenterCategoriesListComponent,
                            },
                            {
                                path: 'detail/:id',
                                component: SupportCenterCategoryDetailComponent,
                            },
                        ],
                    },
                    {
                        path: 'products',
                        children: [
                            {
                                path: 'list',
                                component: SupportCenterProductsListComponent,
                            },
                            {
                                path: 'detail/:id',
                                component: SupportCenterProductDetailComponent,
                            },
                        ],
                    },
                    {
                        path: 'answers',
                        children: [
                            {
                                path: 'create/categoryId/:categoryId/productId/:productId',
                                component: SupportCenterAnswersActionsComponent,
                            },
                            {
                                path: 'update/:answerId',
                                component: SupportCenterAnswersActionsComponent,
                            },
                        ],
                    },

                    {
                        path: 'products',
                        children: [
                            {
                                path: 'list',
                                component: SupportCenterProductsListComponent,
                            },
                        ],
                    },
                ],
            },
            // ! Contragents
            {
                path: 'contragents',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'manager', 'underwriter'] },
                children: [
                    {
                        path: 'list',
                        component: ListContragentsComponent,
                    },
                    {
                        path: 'legal-contractors',
                        children: [
                            {
                                path: 'create',
                                component: ActionsLegalContractorComponent,
                            },
                            {
                                path: 'update/:id',
                                component: ActionsLegalContractorComponent,
                            },
                            {
                                path: 'detail/:id',
                                component: LegalContractorDetailComponent,
                            },
                            {
                                path: 'detail/:id/beneficiaries/create',
                                component:
                                    ActionsBeneficiaryLegalContractorComponent,
                            },
                            {
                                path: 'detail/:id/beneficiaries/update/:itemId',
                                component:
                                    ActionsBeneficiaryLegalContractorComponent,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'catalog',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'manager', 'underwriter'] },
                children: [
                    // ! Partner Identification
                    {
                        path: 'partner-identification',
                        children: [
                            {
                                path: '',
                                component: PartnerIdentificationComponent,
                            },
                            {
                                path: 'detail/:id',
                                component: PartnerIdentificationDetailComponent,
                            },
                        ],
                    },
                    // ! Brands
                    {
                        path: 'brands',
                        component: BrandsComponent,
                    },
                    {
                        path: 'brands/create',
                        component: ActionsBrandComponent,
                    },
                    {
                        path: 'brands/update/:id',
                        component: ActionsBrandComponent,
                    },
                    {
                        path: 'partners',
                        component: ListPartnersComponent,
                    },
                    {
                        path: 'partners/:partnerId/branches/create',
                        component: ActionsPartnerBranchesComponent,
                    },
                    {
                        path: 'partners/:partnerId/branches/update/:branchId',
                        component: ActionsPartnerBranchesComponent,
                    },

                    {
                        path: 'partners/create',
                        component: ActionsPartnerComponent,
                    },
                    {
                        path: 'partners/update/:id',
                        component: ActionsPartnerComponent,
                    },
                    {
                        path: 'partners/detail/:id',
                        component: DetailPartnerComponent,
                    },
                    {
                        path: 'categories',
                        component: CategoriesComponent,
                    },
                    {
                        path: 'categories/create',
                        component: ActionsCategoryComponent,
                    },
                    {
                        path: 'categories/update/:id',
                        component: ActionsCategoryComponent,
                    },
                    {
                        path: 'tags',
                        component: ListTagsComponent,
                    },
                    {
                        path: 'products',
                        component: ListProductsComponent,
                    },
                    {
                        path: 'localities',
                        component: LocalitiesComponent,
                    },
                    // ! Malls
                    {
                        path: 'malls',
                        component: ListMallsComponent,
                    },
                    {
                        path: 'malls/create',
                        component: ActionsMallComponent,
                    },
                    {
                        path: 'malls/update/:id',
                        component: ActionsMallComponent,
                    },
                    {
                        path: 'malls/detail/:id',
                        component: DetailPartnerComponent,
                    },
                    // ! News
                    {
                        path: 'news',
                        component: ListNewsComponent,
                    },
                    {
                        path: 'news/create',
                        component: ActionsNewsComponent,
                    },
                    {
                        path: 'news/update/:id',
                        component: ActionsNewsComponent,
                    },
                    // ! Partner News
                    {
                        path: 'partner-news',
                        component: ListPartnerNewsComponent,
                    },
                    {
                        path: 'partner-news/create',
                        component: ActionsPartnerNewsComponent,
                    },
                    {
                        path: 'partner-news/update/:id',
                        component: ActionsPartnerNewsComponent,
                    },
                    // ! Partner Proms
                    {
                        path: 'partner-proms',
                        component: ListPartnerPromsComponent,
                    },
                    {
                        path: 'partner-proms/create',
                        component: ActionsPartnerPromsComponent,
                    },
                    {
                        path: 'partner-proms/update/:id',
                        component: ActionsPartnerPromsComponent,
                    },
                    // ! Partner Feedbacks
                    {
                        path: 'partner-feedbacks',
                        component: PartnerFeedbacksComponent,
                    },
                    {
                        path: 'partner-feedbacks/detail/:id',
                        component: PartnerFeedbacksDetailComponent,
                    },
                ],
            },

            // ! Identification
            {
                path: 'identification/photo',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'operator'] },
                component: IdentificationGetComponent,
            },
            {
                path: 'identification/video',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'operator'] },
                component: IdentificationGetComponent,
            },
            {
                path: 'identification/detail/:id',
                canActivate: [PermissionsGuard],
                data: { roles: ['admin', 'operator'] },
                component: IdentificationDetailComponent,
            },
            // ! Credit Application
            {
                path: 'credit-application',
                canActivate: [PermissionsGuard],
                data: {
                    roles: [
                        'admin',
                        'credit_specialist',
                        'credit_specialist_admin',
                    ],
                },
                children: [
                    // ! 0-0-3
                    {
                        path: '0-0-3',
                        children: [
                            {
                                path: '',
                                component: CreditApplicationContainerComponent,
                            },
                            {
                                path: 'get',
                                component: GetCreditApplicationsComponent,
                            },
                            {
                                path: 'get/detail/:id',
                                component: CreditApplicationDetailComponent,
                            },
                            {
                                path: 'list',
                                component: CreditApplicationListAdminComponent,
                            },
                            {
                                path: 'list/detail/:id',
                                component:
                                    DetailCreditApplicationAdminComponent,
                            },
                        ],
                    },
                    // ! Fuel Card
                    {
                        path: 'fuel-card',
                        children: [
                            {
                                path: '',
                                component: CreditApplicationContainerComponent,
                            },
                            {
                                path: 'get',
                                component: GetCreditApplicationsComponent,
                            },
                            {
                                path: 'get/detail/:id',
                                component: FuelCardApplicationDetailComponent,
                            },
                            {
                                path: 'list',
                                component:
                                    ListFuelCardApplicationsAdminComponent,
                            },
                            {
                                path: 'list/detail/:id',
                                component:
                                    DetailFuelCardApplicationAdminComponent,
                            },
                        ],
                    },
                    // ! Increase Limit
                    {
                        path: 'increase-limit',
                        children: [
                            {
                                path: '',
                                component: CreditApplicationContainerComponent,
                            },
                            {
                                path: 'get',
                                component: GetCreditApplicationsComponent,
                            },
                            {
                                path: 'get/detail/:id',
                                component:
                                    DetailIncreaseLimitApplicationComponent,
                            },
                            {
                                path: 'list',
                                component:
                                    ListIncreaseLimitApplicationsAdminComponent,
                            },
                            {
                                path: 'list/detail/:id',
                                component:
                                    DetailIncreaseLimitApplicationAdminComponent,
                            },
                        ],
                    },
                    {
                        path: 'social-fund/:pin',
                        component: FullSizeSocialFundComponent,
                    },
                ],
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
