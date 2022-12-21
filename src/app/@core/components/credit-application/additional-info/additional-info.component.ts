import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
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
} from '../../../utils';
@Component({
    selector: 'ngx-additional-info',
    templateUrl: './additional-info.component.html',
    styleUrls: ['./additional-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalInfoComponent implements OnInit {
    @Input() data;
    objectValues = Object.values;
    work;
    additionalIncomes;
    realEstates;
    personalEstates;
    spouseData;
    constructor() {}

    getWorkType() {
        return placeOfWorkType.find(
            (item) => item.value.toLowerCase() === this.work.$type.toLowerCase()
        )?.text;
    }
    getWorkExp() {
        return workExperience.find(
            (item) => item.value === this.work.workExperience
        ).text;
    }
    getWorkPosition() {
        return Position.find((item) => item.value === this.work.position)?.text;
    }
    getActivityType() {
        return entrepreneurTypeEnum.find((e) => e.value === this.work.type)
            .text;
    }
    getRealEstateType(type) {
        return realEstateItemsEnum.find((e) => e.value === type).text;
    }
    getPersonalEstateType(type) {
        return personalEstateItemsEnum.find((e) => e.value === type).text;
    }
    getMaritalStatus() {
        return maritalStatus.find(
            (item) => item.value === this.data.customerData.maritalStatus
        )?.text;
    }
    getDependtsCount() {
        return dependentsCount.find(
            (item) => item.value === this.data.customerData.dependentsCount
        ).text;
    }
    getActualResidenceLoc() {
        return locationMonth.find(
            (item) =>
                item.value ===
                this.data.customerData.durationOfActualResidenceLocation
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
    }
}
