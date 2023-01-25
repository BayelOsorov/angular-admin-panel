import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { Http2ServerRequest } from 'http2';
import { OldBackendService } from '../../../services/old-backend/old-backend.service';
import { toBase64 } from '../../../utils/toBase64';
import { UseHttpImageSourcePipe } from '../secured-image/secured-image.component';
@Component({
    selector: 'ngx-lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxImgComponent implements OnInit {
    @Input() imgUrl;

    open;
    close;
    viewerOpen = false;
    constructor(private backendService: OldBackendService) {}
    openImage() {
        this.open = true;
        // this.backendService
        //     .getBlob(this.imgUrl)
        //     .toPromise()
        //     .then((res) => {
        //         console.log(res);
        //     });
    }

    ngOnInit(): void {}
}
