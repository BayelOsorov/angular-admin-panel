import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class HandleErrorService {
    constructor(private toaster: ToastrService) {}
    public handleError(err) {
        let errorMessage = '';
        if (err.status === 0 || err.status === 500) {
            errorMessage = 'Ошибка сервера';
            return this.toaster.error(errorMessage);
        }
        if (err.error) {
            if (err && err.error.errors) {
                // eslint-disable-next-line guard-for-in
                for (const property in err.error.errors) {
                    errorMessage +=
                        `\r\n ` + property + ': ' + err.error.errors[property];
                }
            }
            if (err && err.error && !err.error.errors) {
                // eslint-disable-next-line guard-for-in
                for (const property in err.error) {
                    errorMessage +=
                        `\r\n ` + property + ': ' + err.error[property];
                }
            }
        } else {
            errorMessage = 'Ошибка сервера';
        }
        this.toaster.error(errorMessage);
    }
}
