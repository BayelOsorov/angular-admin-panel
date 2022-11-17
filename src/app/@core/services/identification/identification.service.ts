import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IdentificationService {
    constructor(private http: HttpClient) {}

    getPhotoIdentification() {
        return this.http.get(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/in-process`
        );
    }
    getVideoIdentification() {
        return this.http.get(
            environment.identificationUrl +
                `/operator/api/v1/identification-requests/next-photo-identification-request`
        );
    }
}
