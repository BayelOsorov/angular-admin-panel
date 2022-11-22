/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    OpenVidu,
    Publisher,
    Session,
    StreamEvent,
    StreamManager,
    Subscriber,
} from 'openvidu-browser';
import { environment } from '../../../environments/environment.prod';
import { IIdentificationDetail } from '../models/identification/identification';
import { IdentificationService } from '../services/identification/identification.service';
import { generateGuid } from '../utils/toBase64';

@Component({
    selector: 'ngx-openvidu',
    templateUrl: './openvidu.component.html',
    styleUrls: ['./openvidu.component.scss'],
})
export class OpenviduComponent implements OnInit, OnDestroy {
    @Input() data: IIdentificationDetail;
    APPLICATION_SERVER_URL = environment.identificationUrl;

    // OpenVidu objects
    OV: OpenVidu;
    session: Session;
    publisher: StreamManager; // Local
    subscribers: StreamManager[] = []; // Remotes

    // Join form
    mySessionId = 'greg-gerge-4343-rge-66';
    callId: string;
    myUserName = 'Operator';

    // Main video of the page, will be 'publisher' or one of the 'subscribers',
    // updated by click event in UserVideoComponent children
    mainStreamManager: StreamManager;

    constructor(private identificationService: IdentificationService) {
        this.generateParticipantInfo();
    }
    ngOnInit(): void {}

    @HostListener('window:beforeunload')
    beforeunloadHandler() {
        // On window closed leave session
        this.leaveSession();
    }

    ngOnDestroy() {
        // On component destroyed leave session
        this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu();

        this.session = this.OV.initSession();

        this.session.on('streamCreated', (event: StreamEvent) => {
            const subscriber: Subscriber = this.session.subscribe(
                event.stream,
                undefined
            );
            this.subscribers.push(subscriber);
        });

        this.session.on('streamDestroyed', (event: StreamEvent) => {
            this.deleteSubscriber(event.stream.streamManager);
        });

        this.session.on('exception', (exception) => {
            console.warn(exception);
        });

        this.createSession().subscribe((data) => {
            console.log(data);

            this.session
                .connect(data.token, { clientData: this.myUserName })
                .then(() => {
                    const publisher: Publisher = this.OV.initPublisher(
                        undefined,
                        {
                            audioSource: undefined, // The source of audio. If undefined default microphone
                            videoSource: undefined, // The source of video. If undefined default webcam
                            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                            publishVideo: true, // Whether you want to start publishing with your video enabled or not
                            resolution: '640x480', // The resolution of your video
                            frameRate: 30, // The frame rate of your video
                            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                            mirror: false, // Whether to mirror your local video or not
                        }
                    );

                    this.session.publish(publisher);

                    this.mainStreamManager = publisher;
                    this.publisher = publisher;
                })
                .catch((error) => {
                    console.log(
                        'There was an error connecting to the session:',
                        error.code,
                        error.message
                    );
                });
        });
    }

    leaveSession() {
        if (this.session) {
            this.session.disconnect();
            this.stopSession();
        }
        // Empty all properties...
        this.subscribers = [];
        delete this.publisher;
        delete this.session;
        delete this.OV;
        this.generateParticipantInfo();
    }

    private generateParticipantInfo() {
        this.mySessionId = 'SessionA';
        this.myUserName = 'Operarot';
    }

    private deleteSubscriber(streamManager: StreamManager): void {
        const index = this.subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    updateMainStreamManager(streamManager: StreamManager) {
        this.mainStreamManager = streamManager;
    }

    createSession() {
        this.callId = generateGuid();

        return this.identificationService.connectVideo(this.data.id, {
            callId: this.callId,
        });
    }
    stopSession() {
        return this.identificationService
            .stopVideo(this.data.id, {
                callId: this.callId,
            })
            .toPromise();
    }
}
