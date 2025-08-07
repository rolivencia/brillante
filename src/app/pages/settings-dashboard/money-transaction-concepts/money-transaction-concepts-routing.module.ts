import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyTransactionConceptsComponent } from './money-transaction-concepts.component';

const routes: Routes = [{ path: '', component: MoneyTransactionConceptsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MoneyTransactionConceptsRoutingModule {}
