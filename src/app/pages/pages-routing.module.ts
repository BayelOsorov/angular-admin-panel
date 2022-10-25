import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { StaffComponent } from './staff/list-staff/staff.component';
import { DetailStaffComponent } from './staff/detail-staff/detail-staff.component';
import { BrandsComponent } from './catalog/brands/brands.component';
import { ListPartnersComponent } from './catalog/partners/list-partners/list-partners.component';
import { ActionsPartnerComponent } from './catalog/partners/actions-partner/actions-partner.component';

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
