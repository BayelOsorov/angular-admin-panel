import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailSupportCenterAnswer } from '../../../../@core/models/support-center/support-center';
import { SupportCenterService } from '../../../../@core/services/support-center/support-center.service';
@Component({
    templateUrl: './support-center-answers-actions.component.html',
    styleUrls: ['./support-center-answers-actions.component.scss'],
})
export class SupportCenterAnswersActionsComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData: IDetailSupportCenterAnswer;
    categoryList = [];
    productList = [];
    answerId: number;
    productId;
    categoryId;
    submitted = false;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private supportService: SupportCenterService,
        private route: ActivatedRoute,
        private location: Location,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            titleRu: ['', [Validators.required, Validators.maxLength(2048)]],
            titleKg: ['', [Validators.required, Validators.maxLength(2048)]],
            titleUz: ['', [Validators.required, Validators.maxLength(2048)]],

            bodyRu: ['', [Validators.required, Validators.maxLength(2048)]],
            bodyKg: ['', [Validators.required, Validators.maxLength(2048)]],
            bodyUz: ['', [Validators.required, Validators.maxLength(2048)]],
            categoryId: ['', [Validators.required]],
            products: [],
            order: ['', Validators.required],
        });
        this.getCategories();
        this.getProducts();
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.categoryId = params['categoryId'];
            this.productId = params['productId'];
            this.answerId = params['answerId'];
            this.form.controls['categoryId'].setValue(
                Number.isInteger(+this.categoryId) ? this.categoryId : null
            );
            this.form.controls['products'].setValue(
                Number.isInteger(+this.productId) ? [this.productId] : null
            );
        });

        if (this.answerId) {
            this.supportService
                .getDetailSupportCenterAnswer(this.answerId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    this.itemData = data;
                    this.form.controls['titleRu'].setValue(data.title.ru);
                    this.form.controls['titleKg'].setValue(data.title.kg);
                    this.form.controls['titleUz'].setValue(data.title.uz);

                    this.form.controls['bodyRu'].setValue(data.body.ru);
                    this.form.controls['bodyKg'].setValue(data.body.kg);
                    this.form.controls['bodyUz'].setValue(data.body.uz);
                    this.form.controls['order'].setValue(data.order);
                    this.form.controls['categoryId'].setValue(data.categoryId);
                    this.form.controls['products'].setValue(data.products);
                });
        }
    }
    getCategories(name = '') {
        this.supportService
            .getListSupportCenterCategories(1)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoryList = res.items;
            });
    }
    getProducts() {
        this.supportService
            .getListSupportCenterProducts(1)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.productList = res.items;
            });
    }
    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            const newVal = {
                ...this.form.value,
                title: {
                    ru: this.form.value.titleRu,
                    uz: this.form.value.titleKg,
                    kg: this.form.value.titleUz,
                },
                body: {
                    ru: this.form.value.bodyRu,
                    uz: this.form.value.bodyKg,
                    kg: this.form.value.bodyUz,
                },

                products:
                    this.form.value.products &&
                    this.form.value.products.length > 0
                        ? this.form.value.products
                        : [],
            };

            if (this.itemData) {
                this.supportService
                    .updateSupportCenterAnswer(this.itemData.id, newVal)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.location.back();
                    });
                return;
            }

            this.supportService
                .createSupportCenterAnswer(newVal)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.location.back();
                });
        }
    }

    onSearch(value: string): void {
        this.getCategories(value);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
