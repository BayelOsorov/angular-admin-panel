import { Component, Input, OnInit } from '@angular/core';
import { IDetailStaff } from '../../../models/staff/staff';

@Component({
    selector: 'ngx-edit-staff',
    templateUrl: './edit-staff.component.html',
    styleUrls: ['./edit-staff.component.scss'],
})
export class EditStaffComponent implements OnInit {
    @Input() staffDetail: IDetailStaff;

    constructor() {}

    ngOnInit(): void {
        console.log(this.staffDetail);
    }
}
