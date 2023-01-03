import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-identification-need-to-edit',
    templateUrl: './need-to-edit.component.html',
    styleUrls: ['./need-to-edit.component.scss'],
})
export class NeedToEditComponent implements OnInit, OnDestroy {
    @Input() control: AbstractControl = new FormControl();

    @Input() submitted = false;
    @Input() isRequired = true;
    @Input() mode = 'default';
    @Input() size = 'large';
    @Input() placeholder: string;
    @Input() data;

    constructor() {}
    onChange(val) {
        this.control.patchValue([val]);
    }
    ngOnInit(): void {}
    ngOnDestroy() {}
    // @Input() isNeedToEdit;
    // @Input() data: IIdentificationDetail;

    // @Output() hideEditEvent = new EventEmitter();

    // form: FormGroup;

    // private destroy$: Subject<void> = new Subject<void>();
    // constructor(
    //     private fb: FormBuilder,
    //     private identificationService: IdentificationService,
    //     private toastService: ToastrService,
    //     private location: Location
    // ) {}
    // hide() {
    //     this.hideEditEvent.emit(false);
    // }
    // onSubmit() {
    //     if (this.form.valid) {
    //         this.identificationService
    //             .needToEditPhotoIdentification(this.data.id, {
    //                 editRequiredProperties: this.form.value,
    //             })
    //             .pipe(takeUntil(this.destroy$))
    //             .subscribe(() => {
    //                 this.toastService.success(
    //                     'Вы успешно отправили на редактирование фотоидентификацию!'
    //                 );
    //                 this.location.back();
    //             });
    //     }
    // }
    // ngOnInit(): void {
    //     this.form = this.fb.group({
    //         PassportFrontSideImageId: [[]],
    //         PassportBackSideImageId: [[]],
    //         Address: [[]],
    //         Pin: [[]],
    //         SelfieWithPassportImageId: [[]],
    //         DocumentNumber: [[]],
    //     });
    // }
    // ngOnDestroy() {
    //     this.destroy$.next();
    //     this.destroy$.complete();
    // }
}
