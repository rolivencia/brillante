import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepairFormHandlerService } from '../../dashboard/repair-dashboard/repair-form-handler.service';

@NgModule({
    declarations: [CustomerFormComponent],
    exports: [CustomerFormComponent],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [RepairFormHandlerService],
})
export class CustomerFormModule {}
