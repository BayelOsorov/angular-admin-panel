import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import {
    Position,
    entrepreneurTypeEnum,
    residenceLocationEnum,
    genderEnum,
    workExperience,
    clientHistoryTypeValue,
    locationMonth,
    dependentsCount,
    maritalStatus,
    placeOfWorkType,
    realEstateItemsEnum,
    personalEstateItemsEnum,
    EducationEnum,
} from '../../../utils';
@Component({
    selector: 'ngx-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrls: ['./additional-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnInit {
    @Output() needToEditUserEvent = new EventEmitter();
    @Input() data;
    @Input() dataScoring;
    @Input() form;

    Math: any;
    objectValues = Object.values;
    work;
    additionalIncomes;
    realEstates;
    personalEstates;
    spouseData;
    constructor() {
        this.Math = Math;
    }
    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    }

    scrollTo(element: any): void {
        console.log(document.getElementById(element) as HTMLElement, element);

        (document.getElementById(element) as HTMLElement).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start',
        });
    }
    getWorkType() {
        return placeOfWorkType.find(
            (item) => item.value.toLowerCase() === this.work.$type.toLowerCase()
        )?.text;
    }
    getWorkExp(type) {
        return workExperience.find((item) => item.value === type).text;
    }
    getEducationType(type) {
        return EducationEnum.find((item) => item.value === type).text;
    }
    getWorkPosition(type) {
        return Position.find((item) => item.value === type)?.text;
    }
    getActivityType(type) {
        return entrepreneurTypeEnum.find((e) => e.value === type).text;
    }
    getRealEstateType(type) {
        return realEstateItemsEnum.find((e) => e.value === type).text;
    }
    getPersonalEstateType(type) {
        return personalEstateItemsEnum.find((e) => e.value === type).text;
    }
    getMaritalStatus(status) {
        return maritalStatus.find((item) => item.value === status)?.text;
    }
    getDependtsCount(count) {
        return dependentsCount.find((item) => item.value === count).text;
    }
    getActualResidenceLoc(loc) {
        return locationMonth.find((item) => item.value === loc).text;
    }
    getGender() {
        return genderEnum.find(
            (e) => e.value === this.dataScoring?.identificationScore.genderValue
        ).text;
    }
    getResidenceLoc(loc) {
        return residenceLocationEnum.find((e) => e.value === loc)?.text;
    }
    getClientHistoryType() {
        return clientHistoryTypeValue.find(
            (item) =>
                item.value ===
                this.dataScoring.creditHistoryScore.clientHistoryTypeValue
        ).text;
    }

    ngOnInit(): void {
        if (this.data) {
            this.work = this.data.customerData.occupation;
            this.additionalIncomes = this.data.customerData.additionalIncomes;
            this.realEstates = this.data.customerData.realEstates;
            this.personalEstates = this.data.customerData.personalEstates;
            this.spouseData = this.data.customerData.spouseData;
        }
        console.log(this.form.get('SpouseData.Incomes'));
    }
}
