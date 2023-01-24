import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
    OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
    selector: 'ngx-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
    @Output() sendCommentEvent = new EventEmitter();
    @Input() comments;
    userData;
    form: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService) {}
    sortArray = (arr) =>
        arr.sort(
            (a, b) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
        );
    onSubmit() {
        if (this.form.valid) {
            this.sendCommentEvent.emit(this.form.value);
            document
                .getElementById('messages')
                .scrollTo(0, document.getElementById('messages').scrollHeight);

            this.form.reset();
        }
    }
    ngOnChanges() {
        document.getElementById('messages').scrollTo(0, 9999999);
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            text: ['', [Validators.required, Validators.maxLength(5046)]],
        });
        this.userData = this.authService.getUserData();
        console.log(this.comments, this.userData);
    }
}
