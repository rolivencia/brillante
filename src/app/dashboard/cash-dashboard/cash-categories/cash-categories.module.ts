import { CashCategoriesComponent } from './cash-categories.component';
import { CashCategoriesRoutingModule } from './cash-categories-routing.module';
import { CashTransactionConceptInfoComponent } from './cash-transaction-concept-info/cash-transaction-concept-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CashTransactionConceptActionsComponent } from './cash-transaction-concept-actions/cash-transaction-concept-actions.component';

@NgModule({
    declarations: [CashCategoriesComponent, CashTransactionConceptInfoComponent, CashTransactionConceptActionsComponent],
    imports: [CommonModule, CashCategoriesRoutingModule, FormsModule, WjInputModule],
})
export class CashCategoriesModule {}
