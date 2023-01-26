import { HttpClient } from '@angular/common/http';
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'ngx-identification-files',
    templateUrl: './identification-files.component.html',
    styleUrls: ['./identification-files.component.scss'],
})
export class IdentificationFilesComponent implements OnInit {
    @Input() data;
    constructor(private authService: AuthService, private http: HttpClient) {}

    ngOnInit(): void {}
}
