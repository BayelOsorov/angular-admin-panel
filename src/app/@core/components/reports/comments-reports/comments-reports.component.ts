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
import { appAnswerCategories } from '../ocl-report-comments/ocl-report-comments.component';
const callAnswers = [...identificationAnswerCategories, ...appAnswerCategories];
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
    submitted = false;
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
        this.form.controls.operationType.setValue('10');
        this.submitted = true;
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
        return val
            ? callAnswers.find((item) => item.value === val)?.label + ' - '
            : '';
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
        if (this.form.valid) {
            this.submitted = false;
        }
    }
    trackByFn(index, item) {
        return item.id;
    }
    ngOnInit(): void {
        this.userData = this.authService.getUserData();
    }
}
