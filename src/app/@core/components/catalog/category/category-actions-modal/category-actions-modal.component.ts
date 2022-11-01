import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { IDetailCategory } from '../../../../models/catalog/category';
import { CategoriesService } from '../../../../services/catalog/categories/categories.service';
import { blobToBase64, toBase64 } from '../../../../utils/toBase64';

@Component({
    selector: 'ngx-category-actions-modal',
    templateUrl: './category-actions-modal.component.html',
    styleUrls: ['./category-actions-modal.component.scss'],
})
export class CategoryActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData: IDetailCategory;
    categoryList = [];
    isLoading = false;
    logoImg;
    searchChange$ = new BehaviorSubject('');
    min: Date;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
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
            isActive: ['', Validators.required],
            order: ['', Validators.required],
            parentId: null,
            workFromDate: ['', Validators.required],
            backgroundColor: ['', Validators.required],
        });
        this.getCategories();

        if (this.itemData) {
            this.form.controls['name'].setValue(this.itemData.name);
            this.form.controls['logo'].setValue(this.itemData.logo);
            this.form.controls['isActive'].setValue(this.itemData.isActive);
            this.form.controls['order'].setValue(this.itemData.order);
            this.form.controls['workFromDate'].setValue(
                this.itemData.workFromDate
            );
            this.form.controls['parentId'].setValue(this.itemData.parentId);
            this.form.controls['backgroundColor'].setValue(
                this.itemData.backgroundColor
            );

            this.getLogImg();
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
    getLogImg() {
        this.logoImg = environment.catalogUrl + this.itemData.logo;
    }
    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.categoryService
                    .editCategory(this.itemData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.categoryService
                .createCategory(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.dialogRef.close('create');
                });
        }
    }
    async onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const logo = await toBase64(file);
            this.logoImg = `data:image/jpeg;base64,${logo}`;
            this.form.patchValue({
                logo,
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
