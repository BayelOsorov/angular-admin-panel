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
import { BrandActionsModalComponent } from '../@core/components/catalog/brand/brand-actions-modal/brand-actions-modal.component';
import { ActionsBrandComponent } from './catalog/brands/actions-brand/actions-brand.component';
import { ListNewsComponent } from './catalog/news/list-news/list-news.component';
import { ActionsNewsComponent } from './catalog/news/actions-news/actions-news.component';
import { ListPartnerPromsComponent } from './catalog/partner-proms/list-partner-proms/list-partner-proms.component';
import { ActionsPartnerPromsComponent } from './catalog/partner-proms/actions-partner-proms/actions-partner-proms.component';
import { ActionsCategoryComponent } from './catalog/categories/actions-category/actions-category.component';
import { ActionsPartnerBranchesComponent } from './catalog/partners/branches/actions-partner-branches/actions-partner-branches.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // ! staff
            {
                path: 'staff',
                component: StaffComponent,
            },
            {
                path: 'staff-detail/:id',
                component: DetailStaffComponent,
            },
            // ! catalog
            {
                path: 'catalog/brands',
                component: BrandsComponent,
            },
            {
                path: 'catalog/brands/create',
                component: ActionsBrandComponent,
            },
            {
                path: 'catalog/brands/update/:id',
                component: ActionsBrandComponent,
            },
            {
                path: 'catalog/partners',
                component: ListPartnersComponent,
            },
            {
                path: 'catalog/partners/:partnerId/branches/create',
                component: ActionsPartnerBranchesComponent,
            },
            {
                path: 'catalog/partners/:partnerId/branches/update/:branchId',
                component: ActionsPartnerBranchesComponent,
            },

            {
                path: 'catalog/partners/create',
                component: ActionsPartnerComponent,
            },
            {
                path: 'catalog/partners/update/:id',
                component: ActionsPartnerComponent,
            },
            {
                path: 'catalog/partners/detail/:id',
                component: DetailPartnerComponent,
            },
            {
                path: 'catalog/categories',
                component: CategoriesComponent,
            },
            {
                path: 'catalog/categories/create',
                component: ActionsCategoryComponent,
            },
            {
                path: 'catalog/categories/update/:id',
                component: ActionsCategoryComponent,
            },
            {
                path: 'catalog/tags',
                component: ListTagsComponent,
            },
            {
                path: 'catalog/products',
                component: ListProductsComponent,
            },
            {
                path: 'catalog/localities',
                component: LocalitiesComponent,
            },

            {
                path: 'catalog/malls',
                component: ListMallsComponent,
            },
            {
                path: 'catalog/malls/create',
                component: ActionsMallComponent,
            },
            {
                path: 'catalog/malls/update/:id',
                component: ActionsMallComponent,
            },
            {
                path: 'catalog/malls/detail/:id',
                component: DetailPartnerComponent,
            },
            {
                path: 'catalog/news',
                component: ListNewsComponent,
            },
            {
                path: 'catalog/news/create',
                component: ActionsNewsComponent,
            },
            {
                path: 'catalog/news/update/:id',
                component: ActionsNewsComponent,
            },

            {
                path: 'catalog/partner-proms',
                component: ListPartnerPromsComponent,
            },
            {
                path: 'catalog/partner-proms/create',
                component: ActionsPartnerPromsComponent,
            },
            {
                path: 'catalog/partner-proms/update/:id',
                component: ActionsPartnerPromsComponent,
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
