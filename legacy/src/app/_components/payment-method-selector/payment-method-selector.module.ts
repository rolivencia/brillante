import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaymentMethodSelectorComponent } from './payment-method-selector.component';

@NgModule({
    declarations: [PaymentMethodSelectorComponent],
    imports: [CommonModule, DropDownListModule, FormsModule, ReactiveFormsModule],
    exports: [PaymentMethodSelectorComponent],
})
export class PaymentMethodSelectorModule {}
