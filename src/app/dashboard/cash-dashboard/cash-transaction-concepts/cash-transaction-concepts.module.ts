import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';
import { CashTransactionConceptsRoutingModule } from './cash-transaction-concepts-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { CashTransactionConceptActionsComponent } from './cash-transaction-concept-actions/cash-transaction-concept-actions.component';
import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group/cash-transaction-concept-input-group.component';
import { CashTransactionConceptsHttpService } from './cash-transaction-concepts.http.service';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { CashTransactionConceptUpdateComponent } from './cash-transaction-concept-update/cash-transaction-concept-update.component';
import { CashTransactionConceptAddComponent } from './cash-transaction-concept-add/cash-transaction-concept-add.component';
import { CashTransactionConceptsFormHandlerService } from './cash-transaction-concepts-form-handler.service';

@NgModule({
    declarations: [
        CashTransactionConceptsComponent,
        CashTransactionConceptActionsComponent,
        CashTransactionConceptInputGroupComponent,
        CashTransactionConceptUpdateComponent,
        CashTransactionConceptAddComponent,
    ],
    imports: [
        CommonModule,
        CashTransactionConceptsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        WjInputModule,
        WjGridModule,
        WjGridFilterModule,
    ],
    providers: [CashTransactionConceptsHttpService, CashTransactionConceptsFormHandlerService],
})
export class CashTransactionConceptsModule {}
