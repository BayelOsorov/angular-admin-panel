import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnersService } from '../../../../services/catalog/partners/partners.service';
import { toBase64 } from '../../../../utils/toBase64';
import { ImageActionsModalComponent } from '../image-actions-modal/image-actions-modal.component';

@Component({
    selector: 'ngx-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
    @Input() partnerId: number;
    form: FormGroup;
    images;
    private destroy$: Subject<void> = new Subject<void>();
    constructor(
        private partnersService: PartnersService,
        private windowService: NbWindowService,
        private toaster: ToastrService
    ) {}
    onFileChange(event) {
        if (event.target.files.length > 0) {
            // console.log(event.target.files);
            Object.values(event.target.files).forEach((item) => {
                toBase64(item).then((res) => {
                    const base64 = `data:image/jpeg;base64,${res}`;
                    this.images.push({ img: base64, id: Date.now() });
                    // this.gallery.push({ img: base64, id: Date.now() });
                });
            });
        }
    }
    deleteImage(imgId) {
        // this.gallery = this.gallery.filter((item) => item.id !== imgId);
        this.partnersService
            .deletePartnerImage(this.partnerId, imgId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.toaster.success('Успешно удалено!');
                this.getImages();
            });
    }
    getImages(page = 1) {
        this.partnersService
            .getListPartnerImages(page, this.partnerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => (this.images = res));
    }
    changePage(page) {
        this.getImages(page);
    }
    public openCreateModal() {
        this.openModal(false, ImageActionsModalComponent, {
            title: 'Добавление картинки',
            context: { partnerId: this.partnerId },
        });
    }
    public openEditModal(data) {
        this.openModal(false, ImageActionsModalComponent, {
            title: 'Редактирование картинки',
            context: { itemData: data, partnerId: this.partnerId },
        });
    }
    public openModal(closeOnBackdropClick: boolean, component, props) {
        this.windowService
            .open(component, {
                closeOnBackdropClick,
                ...props,
            })
            .onClose.subscribe(
                (val) =>
                    (val === 'create' || val === 'edit') && this.getImages()
            );
    }
    ngOnInit(): void {
        this.getImages();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
