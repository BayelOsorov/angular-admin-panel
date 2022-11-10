import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
import { toBase64 } from '../../../../utils/toBase64';
@Component({
    selector: 'ngx-image-actions-modal',
    templateUrl: './image-actions-modal.component.html',
    styleUrls: ['./image-actions-modal.component.scss'],
})
export class ImageActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    partnerId;
    imgSrc;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private partnersService: PartnersService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            title: ['', Validators.required],
            image: ['', Validators.required],
            sequence: ['', Validators.required],
        });

        if (this.itemData) {
            this.form.controls['title'].setValue(this.itemData.title);
            this.form.controls['image'].setValue(this.itemData.imagePath);
            this.form.controls['sequence'].setValue(this.itemData.sequence);
            this.imgSrc = this.itemData.imagePath;
        }
    }
    async onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const img = await toBase64(file);
            this.imgSrc = `data:image/jpeg;base64,${img}`;
            this.form.patchValue({
                image: img,
            });
        }
    }
    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.partnersService
                    .editPartnerImage(
                        this.partnerId,
                        this.itemData.id,
                        this.form.value
                    )
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.partnersService
                .addPartnerImage(this.partnerId, { images: [this.form.value] })
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
