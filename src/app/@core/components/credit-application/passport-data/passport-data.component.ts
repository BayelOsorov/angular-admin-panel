import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-passport-data',
    templateUrl: './passport-data.component.html',
    styleUrls: ['./passport-data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassportDataComponent implements OnInit {
    personalData = {
        pin: '05855858585858',
        name: 'Генри',
        surname: 'Сехудо',
        patronymic: 'Карлос',
        birthDate: '1976-02-12T00:00:00Z',
        gender: 'Male',
        maritalStatus: 'Unspecified',
        passportType: 'An',
        documentNumber: '5522885',
        dateOfExpiry: '2028-02-03T00:00:00Z',
        authority: 'MKK505176',
        dateOfIssue: '2018-02-03T00:00:00Z',
        citizenship: 'KGZ',
        residenceLocation: 'Bishkek',
        residenceAddress: 'пр.Чуй 198',
        profilePhotoUrl:
            'https://stage.c2u.io:2002/operator/api/v1/personal-data/profile-photo?Pin=05855858585858&DocumentNumber=5522885&DocumentType=ID',
    };
    constructor() {}

    ngOnInit(): void {}
}
