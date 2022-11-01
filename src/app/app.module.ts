import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { HttpInterceptorService } from './@core/services/http/http.service';
import { BaseUrlInterceptor } from './@core/interceptors/base-url.interceptor';
import { HttpErrorInterceptor } from './@core/interceptors/error.interceptor';

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
        NbChatModule.forRoot({
            messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
        }),
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
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule {}
