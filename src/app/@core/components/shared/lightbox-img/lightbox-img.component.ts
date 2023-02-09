import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    @Input() safeImgUrl;
    open = false;
    close;
    viewerOpen = false;
    blobUrl;
    zoomOn;
    myThumbnail = 'https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg';
    constructor(
        private backendService: OldBackendService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer
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
                const urlCreator = window.URL || window.webkitURL;
                const imageUrl = urlCreator.createObjectURL(myBlob);
                this.open = false;
                this.cdr.detectChanges();
                // window.location.assign(imageUrl);

                window.open(imageUrl, '_blank');
            });
    }
    openImageSafe() {
        this.open = true;
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
