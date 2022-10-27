import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../../@core/services/catalog/brands/brands.service';
import { CategoriesService } from '../../../../@core/services/catalog/categories/categories.service';
import { toBase64 } from '../../../../@core/utils/toBase64';

@Component({
    templateUrl: './actions-partner.component.html',
    styleUrls: ['./actions-partner.component.scss'],
})
export class ActionsPartnerComponent implements OnInit {
    form: FormGroup;
    logoImg;
    gallery = [
        {
            img: 'https://img2.akspic.ru/attachments/originals/4/4/7/8/3/138744-fenek-hishhnik-psovye-ryzhaya_lisica-morda-4928x3280.jpg',
            id: 32,
        },
        {
            img: 'https://img2.akspic.ru/attachments/originals/4/4/7/8/3/138744-fenek-hishhnik-psovye-ryzhaya_lisica-morda-4928x3280.jpg',
            id: 322,
        },
        {
            img: 'https://img2.akspic.ru/attachments/originals/4/4/7/8/3/138744-fenek-hishhnik-psovye-ryzhaya_lisica-morda-4928x3280.jpg',
            id: 332,
        },
        {
            img: 'https://img2.akspic.ru/attachments/originals/4/4/7/8/3/138744-fenek-hishhnik-psovye-ryzhaya_lisica-morda-4928x3280.jpg',
            id: 302,
        },
    ];
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private categoryService: CategoriesService,
        private brandService: BrandsService
    ) {}

    onSubmit() {}
    onFileChange(event) {
        if (event.target.files.length > 0) {
            // console.log(event.target.files);
            Object.values(event.target.files).forEach((item) => {
                toBase64(item).then((res) => {
                    const base64 = `data:image/jpeg;base64,${res}`;
                    this.gallery.push({ img: base64, id: Date.now() });
                });
            });
        }
    }
    deleteImage(imgId) {
        this.gallery = this.gallery.filter((item) => item.id !== imgId);
    }
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
