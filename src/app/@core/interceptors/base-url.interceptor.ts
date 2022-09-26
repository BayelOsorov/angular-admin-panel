import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (this.skipUrl(request.url)) {
            return next.handle(request);
        }
        const apiReq = request.clone({
            url: `${environment.baseUrl}/${request.url}`,
        });
        return next.handle(apiReq);
    }
    private skipUrl(url: string): boolean {
        if (url.toLowerCase().startsWith('partners')) {
            return false;
        }
        return true;
    }
}
