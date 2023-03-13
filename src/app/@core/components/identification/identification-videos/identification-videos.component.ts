import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { downloadFile } from '../../../utils';

@Component({
    selector: 'ngx-identification-videos',
    templateUrl: './identification-videos.component.html',
    styleUrls: ['./identification-videos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationVideosComponent implements OnInit, OnChanges {
    @Input() videos;
    @Output() getDataEvent = new EventEmitter();
    wmvVideos = [];
    videosChanged;
    constructor(
        private cdr: ChangeDetectorRef,
        private authService: AuthService
    ) {}

    getWmvVideos() {
        this.wmvVideos = [];
        this.videos.forEach((item) => {
            if (this.isWmv(item.url)) {
                let wmvCount = 0;
                fetch(item.url, {
                    headers: {
                        Authorization:
                            'Bearer ' + this.authService.getAccessToken(),
                        responseType: 'blob',
                    },
                })
                    .then((res) => res.blob())
                    .then((myBlob) => {
                        wmvCount++;
                        const blobLink = window.URL.createObjectURL(myBlob);
                        this.wmvVideos.push({ blobUrl: blobLink, ...item });

                        if (wmvCount === this.wmvVideos.length) {
                            this.cdr.markForCheck();
                        }
                    });
            }
        });
    }
    collapsedChange(val) {
        if (!val) {
            this.getDataEvent.emit();
            if (this.videosChanged) {
                this.getWmvVideos();
                this.videosChanged = false;
            }
            this.cdr.markForCheck();
        }
    }
    isWmv(url) {
        return url.endsWith('.wmv');
    }

    trackByFn(index, item) {
        return item.id;
    }
    dowloadVideo(url) {
        downloadFile(url, 'Видео');
    }
    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.videos &&
            changes.videos.currentValue?.length !==
                changes.videos.previousValue?.length
        ) {
            this.videosChanged = true;
        }
    }
    ngOnInit(): void {
        this.getWmvVideos();
    }
}
