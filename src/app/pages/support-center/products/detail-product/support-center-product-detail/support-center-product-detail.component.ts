import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    IDetailSupportCenterCategoriesAndProducts,
    IListSupportCenterAnswers,
} from '../../../../../@core/models/support-center/support-center';
import { SupportCenterService } from '../../../../../@core/services/support-center/support-center.service';
import { tableNumbering, truncateText } from '../../../../../@core/utils';

@Component({
    templateUrl: './support-center-product-detail.component.html',
    styleUrls: ['./support-center-product-detail.component.scss'],
})
export class SupportCenterProductDetailComponent implements OnInit, OnDestroy {
    listAnswers: IListSupportCenterAnswers;
    productId: number;
    productData: IDetailSupportCenterCategoriesAndProducts;
    categoriesList = [];
    form = this.fb.group({
        text: '',
        productId: [''],
        categoryId: [''],
    });
    tableColumns = {
        index: {
            title: '№',
            type: 'number',
            valuePrepareFunction: (value, row, cell) =>
                tableNumbering(this.listAnswers.page, cell.row.index),
        },

        title: {
            title: 'Заголовок на RU',
            type: 'html',
            valuePrepareFunction: (item) =>
                `<div title='${item.ru}'>${truncateText(item.ru)}</div>`,
        },
        body: {
            title: 'Ответ на RU',
            type: 'html',
            valuePrepareFunction: (item) =>
                `<div title='${item.ru}'>${truncateText(item.ru)}</div>`,
        },
    };
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private supportService: SupportCenterService,
        private toaster: ToastrService,
        private domSanitizer: DomSanitizer,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private windowService: NbWindowService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}
    ngOnInit(): void {
        this.form.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.getAnswers(1);
            });
        this.route.params.subscribe((params) => {
            this.productId = params['id'];
            this.form.controls['productId'].setValue(this.productId);
        });
        this.getDetailProduct();
    }
    getAnswers(page = 1) {
        this.supportService
            .getListSupportCenterAnswers(page, this.form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.listAnswers = res));
    }
    deleteAnswer(id: number): void {
        this.supportService
            .deleteSupportCenterAnswer(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.toaster.success('Успешно удалено!');
                this.getAnswers();
            });
    }
    getDetailProduct() {
        this.supportService
            .getDetailSupportCenterProduct(this.productId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.productData = res));
    }
    getCategories(val) {
        this.supportService
            .getListSupportCenterCategories(1)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoriesList = res.items;
            });
    }

    updateAnswer(data) {
        this.router.navigate([`/support-center/answers/update/${data.id}`]);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
