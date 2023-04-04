import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    AfterViewChecked,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { identificationAnswerCategories } from '../identification-report-comments/identification-report-comments.component';
const callAnswers = [...identificationAnswerCategories];
@Component({
    selector: 'ngx-comments-reports',
    templateUrl: './comments-reports.component.html',
    styleUrls: ['./comments-reports.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsReportsComponent implements OnInit, AfterViewChecked {
    @Input() listComments;
    @Input() form;
    @Input() selectOptions;

    @Output() sendCommentEvent = new EventEmitter();
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    userData;
    constructor(
        public router: Router,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) {}
    sortArray = (arr) =>
        arr.sort(
            (a, b) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
        );
    sendComment() {
        this.sendCommentEvent.emit();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =
                this.myScrollContainer.nativeElement.scrollHeight;

            this.cdr.markForCheck();
        } catch (err) {}
    }
    translateAnswers(val) {
        return callAnswers.find((item) => item.value === val)?.label;
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    trackByFn(index, item) {
        return item.id;
    }
    ngOnInit(): void {
        this.userData = this.authService.getUserData();
    }
}
