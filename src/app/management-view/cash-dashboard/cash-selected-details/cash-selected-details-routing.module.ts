import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashSelectedDetailsComponent } from '@management-view/cash-dashboard/cash-selected-details/cash-selected-details.component';

const routes: Routes = [{ path: '', component: CashSelectedDetailsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashSelectedDetailsRoutingModule {}
