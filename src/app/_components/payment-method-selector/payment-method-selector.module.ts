import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodSelectorComponent } from './payment-method-selector.component';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PaymentMethodSelectorComponent],
    imports: [CommonModule, FormsModule, WjInputModule],
    exports: [PaymentMethodSelectorComponent],
})
export class PaymentMethodSelectorModule {}
