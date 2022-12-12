import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder) {}
    onSubmit() {
        if (this.form.valid) {
        }
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            comment: ['', [Validators.required, Validators.maxLength(5046)]],
        });
    }
}
