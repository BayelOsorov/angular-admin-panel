import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { LoaderService } from '../../../services/http/loader.service';

@Component({
    selector: 'ngx-button',
    templateUrl: './btn-loader.component.html',
    styleUrls: ['./btn-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnLoaderComponent implements OnInit {
    @Input() status = 'primary';
    @Input() title = 'подтвердить';
    @Output() clickEvent = new EventEmitter();
    loading;
    constructor(private loaderService: LoaderService) {}
    onClick() {
        this.clickEvent.emit();
        this.loading = this.loaderService.isLoading;
    }
    ngOnInit(): void {}
}
