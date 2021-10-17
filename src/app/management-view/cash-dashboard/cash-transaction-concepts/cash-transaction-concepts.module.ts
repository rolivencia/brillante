import { CashTransactionConceptAddComponent } from './cash-transaction-concept-add/cash-transaction-concept-add.component';
import { CashTransactionConceptSelectedDetailsComponent } from './cash-transaction-concept-selected-details/cash-transaction-concept-selected-details.component';
import { CashTransactionConceptInputGroupComponent } from './cash-transaction-concept-input-group/cash-transaction-concept-input-group.component';
import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';
import { CashTransactionConceptsFormHandlerService } from './cash-transaction-concepts-form-handler.service';
import { CashTransactionConceptsHttpService } from './cash-transaction-concepts.http.service';
import { CashTransactionConceptsRoutingModule } from './cash-transaction-concepts-routing.module';
import { CashTransactionConceptUpdateComponent } from './cash-transaction-concept-update/cash-transaction-concept-update.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

@NgModule({
    declarations: [
        CashTransactionConceptsComponent,
        CashTransactionConceptInputGroupComponent,
        CashTransactionConceptUpdateComponent,
        CashTransactionConceptAddComponent,
        CashTransactionConceptSelectedDetailsComponent,
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