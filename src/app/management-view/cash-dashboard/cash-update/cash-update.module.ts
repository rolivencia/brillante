import { CashUpdateComponent } from './cash-update.component';
import { CashUpdateRoutingModule } from './cash-update-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CashUpdateResolverService } from '@management-view/cash-dashboard/cash-update/cash-update-resolver.service';
import { PaymentMethodSelectorModule } from '../../../_components/payment-method-selector/payment-method-selector.module';

@NgModule({
    declarations: [CashUpdateComponent],
    imports: [
        CommonModule,
        CashUpdateRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        WjInputModule,
        PaymentMethodSelectorModule,
    ],
    providers: [CashUpdateResolverService],
})
export class CashUpdateModule {}
