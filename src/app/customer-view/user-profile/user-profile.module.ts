import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
    declarations: [UserProfileComponent],
    imports: [CommonModule, UserProfileRoutingModule, ReactiveFormsModule, DatePickerModule],
})
export class UserProfileModule {}
