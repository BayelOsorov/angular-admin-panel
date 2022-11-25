import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HandleErrorService } from '../services/http/handle-error.service';
import { environment } from '../../../environments/environment';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private error: HandleErrorService) {}

    // intercept function
    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // returning an observable to complete the request cycle
        if (this.skipUrl(req.url)) {
            return next.handle(req);
        }
        return new Observable((observer) => {
            next.handle(req).subscribe(
                (res: HttpResponse<any>) => {
                    if (res instanceof HttpResponse) {
                        observer.next(res);
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err);

                    this.error.handleError(err);
                    observer.error(err);
                }
            );
        });
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
