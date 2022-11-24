import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDetailCategory } from '../../../../@core/models/catalog/category';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';
import { toBase64 } from '../../../../@core/utils/toBase64';

@Component({
    templateUrl: './actions-category.component.html',
    styleUrls: ['./actions-category.component.scss'],
})
export class ActionsCategoryComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData: IDetailCategory;
    categoryList = [];
    categoryId: number;
    isLoading = false;
    logoImg;
    submitted = false;
    searchChange$ = new BehaviorSubject('');
    min: Date;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        private route: ActivatedRoute,
        private router: Router,
        protected dateService: NbDateService<Date>,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {
        this.min = this.dateService.addDay(this.dateService.today(), +1);
    }

    compareFn = (o1: any, o2: any) => (o1 && o2 ? o1 === o2 : o1 === o2);
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            logo: ['', Validators.required],
            isActive: [true, Validators.required],
            order: ['', Validators.required],
            parentId: null,
            backgroundColor: ['', Validators.required],
        });
        this.getCategories();
        this.route.params.subscribe((params) => {
            this.categoryId = params['id'];
        });

        if (this.categoryId) {
            this.categoryService
                .getDetailCategory(this.categoryId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data) => {
                    this.itemData = data;
                    this.logoImg = data.logo;
                    this.form.controls['name'].setValue(data.name);
                    this.form.controls['logo'].setValue(data.logo);
                    this.form.controls['isActive'].setValue(data.isActive);
                    this.form.controls['order'].setValue(data.order);

                    this.form.controls['parentId'].setValue(data.parentId);
                    this.form.controls['backgroundColor'].setValue(
                        data.backgroundColor
                    );
                });
        }
    }
    getCategories(name = '') {
        this.categoryService
            .getListCategories(1, name)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.categoryList = res.items;
            });
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.valid) {
            if (this.itemData) {
                this.categoryService
                    .editCategory(this.itemData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.router.navigate([`catalog/categories`]);
                    });
                return;
            }

            this.categoryService
                .createCategory(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.router.navigate([`catalog/categories`]);
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
