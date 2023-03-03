import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../../services/http/loader.service';

@Component({
    selector: 'ngx-button',
    templateUrl: './btn-loader.component.html',
    styleUrls: ['./btn-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnLoaderComponent implements OnInit, OnDestroy {
    @Input() status = 'primary';
    @Input() title = 'подтвердить';
    @Output() clickEvent = new EventEmitter();

    isLoading = new Subject<boolean>();
    private destroy$: Subject<void> = new Subject<void>();
    constructor(private loaderService: LoaderService) {}
    onClick() {
        this.isLoading.next(true);
        this.clickEvent.emit();
    }
    ngOnInit(): void {
        this.loaderService.isLoading
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                if (!res) {
                    this.isLoading.next(false);
                }
            });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
