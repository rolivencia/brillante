import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashAddNewRoutingModule } from './cash-add-new-routing.module';
import { CashAddNewComponent } from './cash-add-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { PaymentMethodSelectorModule } from '../../../_components/payment-method-selector/payment-method-selector.module';
import { CashFormHandlerService } from '../cash-form-handler.service';

@NgModule({
    declarations: [CashAddNewComponent],
    imports: [
        CommonModule,
        CashAddNewRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        WjInputModule,
        PaymentMethodSelectorModule,
    ],
    providers: [CashFormHandlerService],
})
export class CashAddNewModule {}
