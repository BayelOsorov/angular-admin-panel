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
    @Input() withAccordion = true;

    @Output() getDataEvent = new EventEmitter();
    wmvVideos = [];
    videosChanged;
    wmvVideoLoading = false;
    constructor(
        private cdr: ChangeDetectorRef,
        private authService: AuthService
    ) {}

    getWmvVideos() {
        this.wmvVideos = [];
        if (this.videos && this.videos.length > 0) {
            this.videos.forEach((item) => {
                if (this.isWmv(item.url)) {
                    this.wmvVideoLoading = true;
                    fetch(item.url, {
                        headers: {
                            Authorization:
                                'Bearer ' + this.authService.getAccessToken(),
                            responseType: 'blob',
                        },
                    })
                        .then((res) => res.blob())
                        .then((myBlob) => {
                            const blobLink = window.URL.createObjectURL(myBlob);
                            this.wmvVideos.push({ blobUrl: blobLink, ...item });
                            this.wmvVideoLoading = false;
                            this.cdr.markForCheck();
                        });
                }
            });
        }
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
        if (!this.withAccordion) {
            this.getWmvVideos();
        }
    }
}
