import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.skipUrl(request.url)) {
            return next.handle(request);
        }
        let token = this.authService.getAccessToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        token = this.authService.getAccessToken();
                        console.log('refresh ' + token);
                    }
                }
                return throwError(err);
            })
        );
    }

    private skipUrl(url: string): boolean {
        if (url.toLowerCase().endsWith('config.json')) {
            return true;
        }
        if (url.toLowerCase().endsWith('.well-known/openid-configuration')) {
            return true;
        }
        if (url.toLowerCase().includes('identity-service.io')) {
            return true;
        }
        return false;
    }
}
