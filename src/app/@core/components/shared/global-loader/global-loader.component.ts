import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../services/http/loader.service';
@Component({
    selector: 'ngx-global-loader',
    templateUrl: './global-loader.component.html',
    styleUrls: ['./global-loader.component.scss'],
})
export class GlobalLoaderComponent implements OnInit {
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    loading = true;

    constructor(private loaderService: LoaderService) {}
    ngOnInit(): void {
        this.isLoading.subscribe((res) => {
            this.loading = res;
            if (!res) {
                setTimeout(() => {
                    this.loading = false;
                }, 2000);
                return;
            }
        });
    }
}
