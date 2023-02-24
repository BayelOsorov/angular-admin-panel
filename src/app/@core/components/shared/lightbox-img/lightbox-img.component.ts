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
    @ViewChild('imageElement') imageElement: ElementRef;
    @ViewChild('imageContainer') imageContainer: ElementRef;
    open = false;
    close;
    viewerOpen = false;
    blobUrl;
    zoomOn;
    myThumbnail = 'https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg';

    // new

    private isFullscreen = false;
    private currentZoom = 1;
    private currentRotation = 0;
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;
    private dragStartScrollLeft = 0;
    private dragStartScrollTop = 0;
    constructor(
        private backendService: OldBackendService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {}

    openImage() {
        this.open = true;
        // fetch(this.imgUrl, {
        //     headers: {
        //         Authorization: 'Bearer ' + this.authService.getAccessToken(),
        //         responseType: 'blob',
        //     },
        // })
        //     .then((res) => res.blob())
        //     .then((myBlob) => {
        //         const urlCreator = window.URL || window.webkitURL;
        //         const imageUrl = urlCreator.createObjectURL(myBlob);
        //         this.open = false;
        //         this.cdr.detectChanges();
        //         // window.location.assign(imageUrl);

        //         window.open(imageUrl, '_blank');
        //     });
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
    toggleFullscreen() {
        const elem = this.imageElement.nativeElement;
        if (!this.isFullscreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        this.isFullscreen = !this.isFullscreen;
    }

    zoomIn() {
        this.currentZoom += 0.5;
        this.updateImageTransform();
    }

    zoomOut() {
        this.currentZoom -= 0.5;
        if (this.currentZoom < 0.1) {
            this.currentZoom = 0.1;
        }
        this.updateImageTransform();
    }

    rotateLeft() {
        this.currentRotation += 270;
        this.updateImageTransform();
    }
    rotateRight() {
        this.currentRotation += 90;
        this.updateImageTransform();
    }
    onImageMouseDown(event: MouseEvent) {
        this.isDragging = true;
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        this.dragStartScrollLeft = this.imageContainer.nativeElement.scrollLeft;
        this.dragStartScrollTop = this.imageContainer.nativeElement.scrollTop;
    }

    onImageMouseUp(event: MouseEvent) {
        this.isDragging = false;
    }

    onImageMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            const deltaX = event.clientX - this.dragStartX;
            const deltaY = event.clientY - this.dragStartY;
            this.imageContainer.nativeElement.scrollLeft =
                this.dragStartScrollLeft - deltaX;
            this.imageContainer.nativeElement.scrollTop =
                this.dragStartScrollTop - deltaY;
        }
    }

    onImageWheel(event: WheelEvent) {
        if (event.deltaY > 0) {
            this.zoomOut();
        } else {
            this.zoomIn();
        }
    }

    updateImageTransform() {
        const elem = this.imageElement.nativeElement;
        const container = this.imageContainer.nativeElement;
        const transform =
            'translate(-50%, -50%) ' +
            'scale(' +
            this.currentZoom +
            ') ' +
            'rotate(' +
            this.currentRotation +
            'deg)';
        elem.style.transform = transform;
        elem.style.webkitTransform = transform;
        elem.style.msTransform = transform;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const scrollLeft = centerX - centerX * this.currentZoom;
        const scrollTop = centerY - centerY * this.currentZoom;
        container.scrollLeft = scrollLeft;
        container.scrollTop = scrollTop;
    }

    ngOnInit(): void {
        // this.getImageBlob();
    }
}
