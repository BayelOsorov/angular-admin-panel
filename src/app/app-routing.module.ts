import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { AuthGuard } from './@core/guards/auth/auth.guard';
import { NbLoginComponent } from '@nebular/auth';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AutoLoginAllRoutesGuard],
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
