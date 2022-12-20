import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'ngx-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
    @Output() sendCommentEvent = new EventEmitter();
    form: FormGroup;
    constructor(private fb: FormBuilder) {}
    onSubmit() {
        if (this.form.valid) {
            this.sendCommentEvent.emit(this.form.value);
        }
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            text: ['', [Validators.required, Validators.maxLength(5046)]],
        });
    }
}
