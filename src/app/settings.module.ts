import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    imports: [NgMultiSelectDropDownModule.forRoot()],
    schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsModule {}
