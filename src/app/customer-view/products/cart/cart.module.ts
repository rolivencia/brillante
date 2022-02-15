import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
    declarations: [CartComponent],
    imports: [CommonModule, CartRoutingModule, NumericTextBoxModule],
})
export class CartModule {}
