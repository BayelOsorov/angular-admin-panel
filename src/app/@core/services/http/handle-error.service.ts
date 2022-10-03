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
        console.log(err);

        if (err.error) {
            if (err && err.error.errors) {
                // eslint-disable-next-line guard-for-in
                for (const property in err.error.errors) {
                    errorMessage +=
                        property + ': ' + err.error.errors[property] + '\n   ';
                }
            }
            // if (err && err.error) {
            //     errorMessage += err.error.title;
            // }
        } else {
            errorMessage = 'Ошибка сервера';
        }
        this.toaster.error(errorMessage);
    }
}
