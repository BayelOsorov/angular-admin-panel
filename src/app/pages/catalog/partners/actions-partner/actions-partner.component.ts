import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';

@Component({
    templateUrl: './actions-partner.component.html',
    styleUrls: ['./actions-partner.component.scss'],
})
export class ActionsPartnerComponent implements OnInit {
    form: FormGroup;
    logoImg;
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        private brandService: BrandsService
    ) {}

    onSubmit() {}
    onFileChange(event) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            logo: ['', Validators.required],
            isActive: ['', Validators.required],
            order: ['', Validators.required],
            description: ['', Validators.required],
            categoryId: ['', Validators.required],
            productId: ['', Validators.required],
            brandId: ['', Validators.required],
            tags: [[], Validators.required],
            gallery: [[], Validators.required],
        });
    }
}
