import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
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

    constructor() {}

    ngOnInit(): void {}
}
