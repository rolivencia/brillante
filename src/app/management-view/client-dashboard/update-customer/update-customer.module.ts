import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCustomerRoutingModule } from './update-customer-routing.module';
import { UpdateCustomerComponent } from './update-customer.component';

@NgModule({
    declarations: [UpdateCustomerComponent],
    imports: [CommonModule, UpdateCustomerRoutingModule],
})
export class UpdateCustomerModule {}
