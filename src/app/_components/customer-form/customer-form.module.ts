import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RepairFormHandlerService } from '../../dashboard/repair-dashboard/repair-form-handler.service';
import { CustomerFormService } from './customer-form.service';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [CustomerFormComponent],
    exports: [CustomerFormComponent],
    imports: [CommonModule, NgbDatepickerModule, ReactiveFormsModule],
    providers: [CustomerFormService, RepairFormHandlerService],
})
export class CustomerFormModule {}
