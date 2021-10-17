import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashTransactionConceptsComponent } from './cash-transaction-concepts.component';

const routes: Routes = [{ path: '', component: CashTransactionConceptsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashTransactionConceptsRoutingModule {}
