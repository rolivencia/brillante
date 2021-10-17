import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairAddNewRoutingModule } from './repair-add-new-routing.module';
import { RepairAddNewComponent } from '@management-view/repair-dashboard/repair-add-new/repair-add-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { RepairFormHandlerService } from '@management-view/repair-dashboard/repair-form-handler.service';
import { CustomerFormModule } from '../../../_components/customer-form/customer-form.module';

@NgModule({
    declarations: [RepairAddNewComponent],
    imports: [CommonModule, CustomerFormModule, ReactiveFormsModule, RepairAddNewRoutingModule, WjInputModule],
    providers: [RepairFormHandlerService],
})
export class RepairAddNewModule {}
