import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
// import { Lightbox } from '@ngx-gallery/lightbox';
// import {
//     Gallery,
//     GalleryItem,
//     ImageItem,
//     ThumbnailsPosition,
//     ImageSize,
// } from '@ngx-gallery/core';
import { UseHttpImageSourcePipe } from '../secured-image/secured-image.component';
@Component({
    selector: 'ngx-lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxImgComponent implements OnInit {
    @Input() imgUrls;
    // items: GalleryItem[];

    constructor(
        // public gallery: Gallery,
        // public lightbox: Lightbox,
        private imgSourcePipe: UseHttpImageSourcePipe
    ) {}
    getAuthImg(src) {
        let gg = this.imgSourcePipe.transform(src);

        console.log(gg, src);
    }
    ngOnInit(): void {
        console.log(this.imgUrls);

        // this.items = this.imgUrls.map(
        //     (item) => new ImageItem({ src: this.getAuthImg(item) })
        // );
        // // Get a lightbox gallery ref
        // const lightboxRef = this.gallery.ref('lightbox');

        // // Add custom gallery config to the lightbox (optional)
        // lightboxRef.setConfig({
        //     imageSize: ImageSize.Cover,
        //     thumbPosition: ThumbnailsPosition.Top,
        // });

        // // Load items into the lightbox gallery ref
        // lightboxRef.load(this.items);
    }
}

const data = [
    {
        srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
        previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    },
    {
        srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
        previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    },
    {
        srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
        previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    },
    {
        srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
        previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    },
];
