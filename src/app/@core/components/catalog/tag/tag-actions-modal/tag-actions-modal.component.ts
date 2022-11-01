import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TagsService } from '../../../../services/catalog/tags/tags.service';

@Component({
    selector: 'ngx-tag-actions-modal',
    templateUrl: './tag-actions-modal.component.html',
    styleUrls: ['./tag-actions-modal.component.scss'],
})
export class TagActionsModalComponent implements OnInit, OnDestroy {
    form: FormGroup;
    itemData;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private tagsService: TagsService,
        @Optional() private dialogRef: NbWindowRef<any>
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            ru: ['', Validators.required],
            uz: ['', Validators.required],
            kg: ['', Validators.required],
        });
        if (this.itemData) {
            this.form.controls['ru'].setValue(this.itemData.name.ru);
            this.form.controls['uz'].setValue(this.itemData.name.uz);
            this.form.controls['kg'].setValue(this.itemData.name.kg);
        }
    }

    onFirstSubmit() {
        if (this.form.valid) {
            if (this.itemData) {
                this.tagsService
                    .editTag(this.itemData.id, { name: this.form.value })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((res) => {
                        this.toaster.success('Успешно отредактировано!');
                        this.dialogRef.close('edit');
                    });
                return;
            }

            this.tagsService
                .createTag({ name: this.form.value })
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
