import { HttpClient, HttpResponse } from '@angular/common/http';
import {
    ChangeDetectorRef,
    OnDestroy,
    Pipe,
    PipeTransform,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    switchMap,
    tap,
} from 'rxjs/operators';
@Pipe({
    name: 'useHttpImgSrc',
    pure: false,
})
export class UseHttpImageSourcePipe implements PipeTransform, OnDestroy {
    private subscription = new Subscription();
    private transformValue = new BehaviorSubject<string>('');
    private latestValue!: string | SafeUrl;
    private loadingImagePath!: string;
    private errorImagePath!: string;
    constructor(
        private httpClient: HttpClient,
        private domSanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ) {
        this.setUpSubscription();
    }

    transformObs(imagePath: string) {
        // we emit a new value
        this.transformValue.next(imagePath);

        return of(this.latestValue);
    }
    transform(
        imagePath: string,
        loadingImagePath = 'https://cdn.dribbble.com/users/664475/screenshots/5411820/dribbble.gif',
        // loadingImagePath = 'https://cdn.dribbble.com/users/1092116/screenshots/2857934/loading-indicator-dribbble2.gif',
        errorImagePath = 'https://avatars.mds.yandex.net/i?id=98a0979d2252816a50f53d8596cedef6188825f3-5118451-images-thumbs&n=13'
    ) {
        this.setLoadingAndErrorImagePaths(loadingImagePath, errorImagePath);
        if (!imagePath) {
            return this.errorImagePath;
        }

        this.transformValue.next(imagePath);
        return this.latestValue || this.loadingImagePath;
    }
    private setLoadingAndErrorImagePaths(
        loadingImagePath: string,
        errorImagePath: string
    ): void {
        if (this.loadingImagePath && this.errorImagePath) {
            return;
        }
        this.loadingImagePath = loadingImagePath;
        this.errorImagePath = errorImagePath;
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private setUpSubscription(): void {
        const transformSubscription = this.transformValue
            .asObservable()
            .pipe(
                filter((v): v is string => !!v),
                distinctUntilChanged(),
                // we use switchMap, so the previous subscription gets torn down
                switchMap((imagePath: string) =>
                    this.httpClient
                        // we get the imagePath, observing the response and getting it as a 'blob'
                        .get(imagePath, {
                            observe: 'response',
                            responseType: 'blob',
                        })
                        .pipe(
                            // we map our blob into an ObjectURL
                            map((response: HttpResponse<Blob>) =>
                                URL.createObjectURL(response.body)
                            ),
                            // we bypass Angular's security mechanisms
                            map((unsafeBlobUrl: string) =>
                                this.domSanitizer.bypassSecurityTrustUrl(
                                    unsafeBlobUrl
                                )
                            ),
                            // we trigger it only when there is a change in the result
                            filter((blobUrl) => blobUrl !== this.latestValue)
                        )
                ),
                tap((imagePath: string | SafeUrl) => {
                    this.latestValue = imagePath;
                    this.cdr.markForCheck();
                })
            )
            .subscribe();
        this.subscription.add(transformSubscription);
    }
}
