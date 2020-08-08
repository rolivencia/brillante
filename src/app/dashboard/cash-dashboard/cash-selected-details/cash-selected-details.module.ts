import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashSelectedDetailsRoutingModule } from './cash-selected-details-routing.module';
import { CashSelectedDetailsComponent } from './cash-selected-details.component';

@NgModule({
    declarations: [CashSelectedDetailsComponent],
    imports: [CommonModule, CashSelectedDetailsRoutingModule],
    providers: [],
})
export class CashSelectedDetailsModule {}
