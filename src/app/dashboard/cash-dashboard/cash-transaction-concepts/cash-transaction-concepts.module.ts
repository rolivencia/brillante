import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';
import { CashTransactionConceptsRoutingModule } from './cash-transaction-concepts-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CashTransactionConceptActionsComponent } from './cash-transaction-concept-actions/cash-transaction-concept-actions.component';
import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group/cash-transaction-concept-input-group.component';
import { CashTransactionConceptsHttpService } from './cash-transaction-concepts.http.service';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';

@NgModule({
    declarations: [
        CashTransactionConceptsComponent,
        CashTransactionConceptActionsComponent,
        CashTransactionConceptInputGroupComponent,
    ],
    imports: [
        CommonModule,
        CashTransactionConceptsRoutingModule,
        FormsModule,
        WjInputModule,
        WjGridModule,
        WjGridFilterModule,
    ],
    providers: [CashTransactionConceptsHttpService],
})
export class CashTransactionConceptsModule {}
