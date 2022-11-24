import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { toBase64 } from '../../utils/toBase64';

@Component({
    selector: 'ngx-img-input',
    templateUrl: './img-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgInputComponent implements OnInit {
    @Input() control: AbstractControl = new FormControl();
    @Input() submitted = false;
    @Input() imgSrc;
    blobImg;
    changed = false;
    constructor() {}
    onFileChange(event) {
        this.changed = true;
        if (event.target.files.length > 0) {
            toBase64(event.target.files[0]).then((data) => {
                this.control.setValue(data.base64);
                this.blobImg = data.blob;
            });
        }
    }
    ngOnInit(): void {}
}
