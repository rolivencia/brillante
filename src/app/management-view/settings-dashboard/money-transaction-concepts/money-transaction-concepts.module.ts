import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyTransactionConceptAddComponent } from './money-transaction-concept-add/money-transaction-concept-add.component';
import { MoneyTransactionConceptInputGroupComponent } from './money-transaction-concept-input-group/money-transaction-concept-input-group.component';
import { MoneyTransactionConceptSelectedDetailsComponent } from './money-transaction-concept-selected-details/money-transaction-concept-selected-details.component';
import { MoneyTransactionConceptUpdateComponent } from './money-transaction-concept-update/money-transaction-concept-update.component';
import { MoneyTransactionConceptsComponent } from './money-transaction-concepts.component';
import { MoneyTransactionConceptsFormHandlerService } from './money-transaction-concepts-form-handler.service';
import { MoneyTransactionConceptsHttpService } from './money-transaction-concepts.http.service';
import { MoneyTransactionConceptsRoutingModule } from './money-transaction-concepts-routing.module';
import { NgModule } from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

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
        DropDownListModule,
        FormsModule,
        MoneyTransactionConceptsRoutingModule,
        ReactiveFormsModule,
        WjGridModule,
        WjGridFilterModule,
    ],
    providers: [MoneyTransactionConceptsHttpService, MoneyTransactionConceptsFormHandlerService],
})
export class MoneyTransactionConceptsModule {}
