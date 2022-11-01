import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsService } from '../../../../services/catalog/products/products.service';
@Component({
    selector: 'ngx-product-actions-modal',
    templateUrl: './product-actions-modal.component.html',
    styleUrls: ['./product-actions-modal.component.scss'],
})
export class ProductActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private productService: ProductsService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            isActive: ['', Validators.required],
        });
        if (this.itemData) {
            this.form.controls['name'].setValue(this.itemData.name);
            this.form.controls['isActive'].setValue(this.itemData.isActive);
        }
    }

    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.productService
                    .editProduct(this.itemData.id, this.form.value)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.productService
                .createProduct(this.form.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.toaster.success('Успешно создано!');
                    this.dialogRef.close('create');
                });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
