import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
    NbChatModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
} from '@nebular/theme';
import { AuthConfigModule } from './auth/auth-config.module';
import { ComponentsModule } from './@core/components/components.module';
import { DemoNgZorroAntdModule } from './@core/utils/ng-zorro-antd.module';
import { ToastrModule } from 'ngx-toastr';
import {
    DatePipe,
    registerLocaleData,
    DATE_PIPE_DEFAULT_TIMEZONE,
} from '@angular/common';
import localeKy from '@angular/common/locales/ky';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,

        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbDialogModule.forRoot(),
        NbWindowModule.forRoot(),
        NbToastrModule.forRoot(),
        // NbChatModule.forRoot({
        //     messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        // }),
        AuthConfigModule,
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        ComponentsModule,
        DemoNgZorroAntdModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right',
        }),
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru_Ru' },
        { provide: DATE_PIPE_DEFAULT_TIMEZONE, useValue: 'Asia/Bishkek' },
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}
