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
                path: 'catalog/partners',
                component: ListPartnersComponent,
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
                path: 'catalog/tags',
                component: ListTagsComponent,
            },
            {
                path: 'catalog/products',
                component: ListProductsComponent,
            },
            {
                path: '',
                redirectTo: 'catalog/brands',
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
