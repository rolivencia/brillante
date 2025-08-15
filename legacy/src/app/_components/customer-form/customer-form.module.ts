import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepairFormHandlerService } from '@pages/repair-dashboard/repair-form-handler.service';
import { CustomerFormService } from './customer-form.service';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
    declarations: [CustomerFormComponent],
    exports: [CustomerFormComponent],
    imports: [CommonModule, ReactiveFormsModule, DatePickerModule],
    providers: [CustomerFormService, RepairFormHandlerService],
})
export class CustomerFormModule {}
