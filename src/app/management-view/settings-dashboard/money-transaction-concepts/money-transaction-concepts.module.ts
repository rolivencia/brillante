import { MoneyTransactionConceptAddComponent } from './money-transaction-concept-add/money-transaction-concept-add.component';
import { MoneyTransactionConceptSelectedDetailsComponent } from './money-transaction-concept-selected-details/money-transaction-concept-selected-details.component';
import { MoneyTransactionConceptInputGroupComponent } from './money-transaction-concept-input-group/money-transaction-concept-input-group.component';
import { MoneyTransactionConceptsComponent } from './money-transaction-concepts.component';
import { MoneyTransactionConceptsFormHandlerService } from './money-transaction-concepts-form-handler.service';
import { MoneyTransactionConceptsHttpService } from './money-transaction-concepts.http.service';
import { MoneyTransactionConceptsRoutingModule } from './money-transaction-concepts-routing.module';
import { MoneyTransactionConceptUpdateComponent } from './money-transaction-concept-update/money-transaction-concept-update.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

@NgModule({
    declarations: [
        MoneyTransactionConceptsComponent,
        MoneyTransactionConceptInputGroupComponent,
        MoneyTransactionConceptUpdateComponent,
        MoneyTransactionConceptAddComponent,
        MoneyTransactionConceptSelectedDetailsComponent,
    ],
    imports: [
        CommonModule,
        MoneyTransactionConceptsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        WjInputModule,
        WjGridModule,
        WjGridFilterModule,
    ],
    providers: [MoneyTransactionConceptsHttpService, MoneyTransactionConceptsFormHandlerService],
})
export class MoneyTransactionConceptsModule {}
