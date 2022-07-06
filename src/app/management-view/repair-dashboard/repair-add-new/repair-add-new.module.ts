import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairAddNewRoutingModule } from './repair-add-new-routing.module';
import { RepairAddNewComponent } from '@management-view/repair-dashboard/repair-add-new/repair-add-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerFormModule } from '@components/customer-form/customer-form.module';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    declarations: [RepairAddNewComponent],
    imports: [CommonModule, CustomerFormModule, ReactiveFormsModule, RepairAddNewRoutingModule, DropDownListModule],
})
export class RepairAddNewModule {}
