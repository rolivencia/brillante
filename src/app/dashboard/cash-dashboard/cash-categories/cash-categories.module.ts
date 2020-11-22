import { CashCategoriesComponent } from './cash-categories.component';
import { CashCategoriesRoutingModule } from './cash-categories-routing.module';
import { CashTransactionConceptInfoComponent } from './cash-transaction-concept-info/cash-transaction-concept-info.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CashTransactionConceptActionsComponent } from './cash-transaction-concept-actions/cash-transaction-concept-actions.component';
import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group/cash-transaction-concept-input-group.component';
import { CashConceptsHttpService } from './cash-concepts.http.service';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';

@NgModule({
    declarations: [
        CashCategoriesComponent,
        CashTransactionConceptInfoComponent,
        CashTransactionConceptActionsComponent,
        CashTransactionConceptInputGroupComponent,
    ],
    imports: [CommonModule, CashCategoriesRoutingModule, FormsModule, WjInputModule, WjGridModule, WjGridFilterModule],
    providers: [CashConceptsHttpService],
})
export class CashCategoriesModule {}
