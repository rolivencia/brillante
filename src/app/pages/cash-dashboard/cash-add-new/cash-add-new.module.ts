import { CashAddNewComponent } from './cash-add-new.component';
import { CashAddNewRoutingModule } from './cash-add-new-routing.module';
import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaymentMethodSelectorModule } from '@components/payment-method-selector/payment-method-selector.module';

@NgModule({
    declarations: [CashAddNewComponent],
    imports: [
        CashAddNewRoutingModule,
        CommonModule,
        DropDownListModule,
        FormsModule,
        PaymentMethodSelectorModule,
        ReactiveFormsModule,
    ],
})
export class CashAddNewModule {}
