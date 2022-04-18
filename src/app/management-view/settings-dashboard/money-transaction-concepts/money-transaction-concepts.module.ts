import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { MoneyTransactionConceptAddComponent } from './money-transaction-concept-add/money-transaction-concept-add.component';
import { MoneyTransactionConceptInputGroupComponent } from './money-transaction-concept-input-group/money-transaction-concept-input-group.component';
import { MoneyTransactionConceptSelectedDetailsComponent } from './money-transaction-concept-selected-details/money-transaction-concept-selected-details.component';
import { MoneyTransactionConceptUpdateComponent } from './money-transaction-concept-update/money-transaction-concept-update.component';
import { MoneyTransactionConceptsComponent } from './money-transaction-concepts.component';
import { MoneyTransactionConceptsFormHandlerService } from './money-transaction-concepts-form-handler.service';
import { MoneyTransactionConceptsHttpService } from './money-transaction-concepts.http.service';
import { MoneyTransactionConceptsRoutingModule } from './money-transaction-concepts-routing.module';
import { NgModule } from '@angular/core';

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
        GridModule,
        MoneyTransactionConceptsRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [MoneyTransactionConceptsHttpService, MoneyTransactionConceptsFormHandlerService],
})
export class MoneyTransactionConceptsModule {}
