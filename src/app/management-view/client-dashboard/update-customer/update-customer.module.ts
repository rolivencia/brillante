import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCustomerRoutingModule } from './update-customer-routing.module';
import { UpdateCustomerComponent } from './update-customer.component';
import { CustomerFormModule } from '@components/customer-form/customer-form.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [UpdateCustomerComponent],
    imports: [CommonModule, UpdateCustomerRoutingModule, CustomerFormModule, ReactiveFormsModule],
})
export class UpdateCustomerModule {}
