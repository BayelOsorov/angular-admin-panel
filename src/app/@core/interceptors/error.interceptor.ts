import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandleErrorService } from '../services/http/handle-error.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private error: HandleErrorService) {}

    // intercept function
    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // returning an observable to complete the request cycle
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
                }
            );
        });
    }
}
