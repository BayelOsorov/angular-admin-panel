import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    templateUrl: './support-center-category-detail.component.html',
    styleUrls: ['./support-center-category-detail.component.scss'],
})
export class SupportCenterCategoryDetailComponent implements OnInit {
    listAnswers: IListSupportCenterAnswers;
    categoryId: number;
    categoryData: IDetailSupportCenterCategoriesAndProducts;
    productList = [];
    form = this.fb.group({
        text: '',
        categoryId: [''],
        productId: [''],
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
            type: 'text',
            valuePrepareFunction: (item) => truncateText(item.ru),
        },
        body: {
            title: 'Ответ на RU',
            type: 'text',
            valuePrepareFunction: (item) => truncateText(item.ru),
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
            this.categoryId = params['id'];
            this.form.controls['categoryId'].setValue(this.categoryId);
        });
        this.getDetailCategory();
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
    getDetailCategory() {
        this.supportService
            .getDetailSupportCenterCategory(this.categoryId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.categoryData = res));
    }
    getProducts(val) {
        this.supportService
            .getListSupportCenterProducts(1)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.productList = res.items;
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
