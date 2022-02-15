import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInputComponent } from './payment-input.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
    declarations: [PaymentInputComponent],
    imports: [CommonModule, DropDownListModule, NumericTextBoxModule, ReactiveFormsModule],
    providers: [FormBuilder],
    exports: [PaymentInputComponent],
})
export class PaymentInputModule {}
