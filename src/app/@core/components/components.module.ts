import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbListModule,
    NbSelectModule,
    NbStepperModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule as ngFormsModule } from '@angular/forms';

import { CreateStaffModalComponent } from './staff/createStaffModal/create-staff-modal/create-staff-modal.component';
import { EditStaffComponent } from './staff/edit-staff/edit-staff.component';

@NgModule({
    imports: [
        CommonModule,
        NbStepperModule,
        NbCardModule,
        FormsModule,
        ReactiveFormsModule,
        NbButtonModule,
        ngFormsModule,
        NbSelectModule,
        NbInputModule,
        NbListModule,
    ],
    declarations: [CreateStaffModalComponent, EditStaffComponent],
})
export class ComponentsModule {}
