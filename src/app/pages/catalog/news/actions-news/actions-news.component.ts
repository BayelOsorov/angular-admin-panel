import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NewsService } from '../../../../@core/services/catalog/news/news.service';
import { ProductsService } from '../../../../@core/services/catalog/products/products.service';
import { toBase64 } from '../../../../@core/utils/toBase64';
@Component({
    templateUrl: './actions-news.component.html',
    styleUrls: ['./actions-news.component.scss'],
})
export class ActionsNewsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    coverImg;
    newsId;
    newsData;
    submitted = false;
    products = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private newsService: NewsService,
        private productService: ProductsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.newsData) {
                this.newsService
                    .editNews(this.newsData.id, {
                        ...this.form.value,
                        title: {
                            ru: this.form.value.titleRu,
                            kg: this.form.value.titleKg,
                            uz: this.form.value.titleUz,
                        },
                        shortText: {
                            ru: this.form.value.shortTextRu,
                            kg: this.form.value.shortTextKg,
                            uz: this.form.value.shortTextUz,
                        },
                        text: {
                            ru: this.form.value.textRu,
                            kg: this.form.value.textKg,
                            uz: this.form.value.textUz,
                        },
                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/news`]);
                    });
                return;
            }

            this.newsService
                .createNews({
                    ...this.form.value,
                    title: {
                        ru: this.form.value.titleRu,
                        kg: this.form.value.titleKg,
                        uz: this.form.value.titleUz,
                    },
                    shortText: {
                        ru: this.form.value.shortTextRu,
                        kg: this.form.value.shortTextKg,
                        uz: this.form.value.shortTextUz,
                    },
                    text: {
                        ru: this.form.value.textRu,
                        kg: this.form.value.textKg,
                        uz: this.form.value.textUz,
                    },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/news`]);
                });
        }
    }
    getProducts(name = '') {
        this.productService
            .getListProducts(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.products = res.items));
    }
    ngOnInit(): void {
        this.form = this.fb.group({
            cover: ['', Validators.required],
            isActive: [true, Validators.required],
            titleRu: ['', Validators.required],
            titleKg: ['', Validators.required],
            titleUz: ['', Validators.required],
            shortTextRu: ['', Validators.required],
            shortTextKg: ['', Validators.required],
            shortTextUz: ['', Validators.required],
            textRu: ['', Validators.required],
            textKg: ['', Validators.required],
            textUz: ['', Validators.required],
            productId: ['', Validators.required],
        });
        this.route.params.subscribe((params) => {
            this.newsId = params['id'];
        });
        this.getProducts();
        if (this.newsId) {
            this.newsService
                .getDetailNews(this.newsId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (data) => {
                        this.newsData = data;
                        this.form.controls['isActive'].setValue(data.isActive);
                        this.form.controls['cover'].setValue(data.cover);

                        this.form.controls['productId'].setValue(
                            data.productId
                        );
                        this.form.controls['titleRu'].setValue(data.title.ru);
                        this.form.controls['titleKg'].setValue(data.title.kg);
                        this.form.controls['titleUz'].setValue(data.title.uz);

                        this.form.controls['shortTextRu'].setValue(
                            data.shortText.ru
                        );
                        this.form.controls['shortTextKg'].setValue(
                            data.shortText.kg
                        );
                        this.form.controls['shortTextUz'].setValue(
                            data.shortText.uz
                        );
                        this.form.controls['textRu'].setValue(data.text.ru);
                        this.form.controls['textKg'].setValue(data.text.kg);
                        this.form.controls['textUz'].setValue(data.text.uz);
                        this.coverImg = data.cover;
                    },
                });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
