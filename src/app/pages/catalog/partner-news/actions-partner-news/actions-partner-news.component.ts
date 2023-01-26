import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerNewsService } from '../../../../@core/services/catalog/partner-news/partner-news.service';
@Component({
    templateUrl: './actions-partner-news.component.html',
    styleUrls: ['./actions-partner-news.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ActionsPartnerNewsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    partnerNewsId;
    partnerNewsData;
    content;
    submitted = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnerNewsService: PartnerNewsService,
        private route: ActivatedRoute,
        private router: Router,
        protected dateService: NbDateService<Date>
    ) {}
    getDate() {}
    onSubmit() {
        this.submitted = true;

        if (this.form.valid) {
            if (this.partnerNewsData) {
                this.partnerNewsService
                    .editPartnerNews(this.partnerNewsData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/partner-news`]);
                    });
                return;
            }

            this.partnerNewsService
                .createPartnerNews(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/partner-news`]);
                });
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            shortContent: ['', Validators.required],
            title: ['', [Validators.required, Validators.maxLength(256)]],
            content: ['', Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.partnerNewsId = params['id'];
        });
        this.form.controls.content.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => (this.content = val));
        if (this.partnerNewsId) {
            this.partnerNewsService
                .getDetailPartnerNews(this.partnerNewsId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data: any) => {
                        this.partnerNewsData = data;
                        console.log(data);

                        this.form.controls['title'].setValue(data.title);
                        this.form.controls['shortContent'].setValue(
                            data.shortContent
                        );
                        this.form.controls['content'].setValue(data.content);
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
