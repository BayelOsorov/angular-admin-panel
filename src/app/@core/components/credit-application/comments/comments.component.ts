import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
    Input,
    OnChanges,
    ViewChild,
    ElementRef,
    AfterViewChecked,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
    selector: 'ngx-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewChecked {
    @Output() sendCommentEvent = new EventEmitter();
    @Input() comments;
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
            this.form.reset();
        }
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =
                this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {}
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            text: ['', [Validators.required, Validators.maxLength(5046)]],
        });
        this.userData = this.authService.getUserData();
        this.scrollToBottom();
    }
}
