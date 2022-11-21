import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { StreamManager } from 'openvidu-browser';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ov-video',
    template: '<video #videoElement></video>',
    styleUrls: ['./openvidu.component.scss'],
})
export class OpenViduVideoComponent implements AfterViewInit {
    @ViewChild('videoElement') elementRef: ElementRef;

    _streamManager: StreamManager;

    ngAfterViewInit() {
        this._streamManager.addVideoElement(this.elementRef.nativeElement);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    set streamManager(streamManager: StreamManager) {
        this._streamManager = streamManager;
        if (!!this.elementRef) {
            this._streamManager.addVideoElement(this.elementRef.nativeElement);
        }
    }
}
