import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
} from '@angular/core';
import { Http2ServerRequest } from 'http2';
import { AuthService } from '../../../services/auth/auth.service';
import { OldBackendService } from '../../../services/old-backend/old-backend.service';
import { toBase64 } from '../../../utils/toBase64';
import { UseHttpImageSourcePipe } from '../secured-image/secured-image.component';
@Component({
    selector: 'ngx-lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
})
export class LightboxImgComponent implements OnInit {
    @Input() imgUrl;

    open = false;
    close;
    viewerOpen = false;
    blobUrl;
    constructor(
        private backendService: OldBackendService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}
    openImage() {
        this.open = true;
        fetch(this.imgUrl, {
            headers: {
                Authorization: 'Bearer ' + this.authService.getAccessToken(),
                responseType: 'blob',
            },
        })
            .then((res) => res.blob())
            .then((myBlob) => {
                this.open = false;
                this.cdr.detectChanges();
                window.open(window.URL.createObjectURL(myBlob));
            });
    }
    getImageBlob() {
        fetch(this.imgUrl, {
            headers: {
                Authorization: 'Bearer ' + this.authService.getAccessToken(),
                responseType: 'blob',
            },
        })
            .then((res) => res.blob())
            .then((myBlob) => {
                this.blobUrl = window.URL.createObjectURL(myBlob);
            });
    }

    ngOnInit(): void {
        // this.getImageBlob();
    }
}
