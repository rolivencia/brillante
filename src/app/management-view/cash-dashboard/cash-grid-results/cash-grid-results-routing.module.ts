import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashGridResultsComponent } from '@management-view/cash-dashboard/cash-grid-results/cash-grid-results.component';

const routes: Routes = [{ path: '', component: CashGridResultsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashGridResultsRoutingModule {}
