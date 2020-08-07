import { CashUpdateComponent } from '@app/dashboard/cash-dashboard/cash-update/cash-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CashUpdateComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CashUpdateRoutingModule {}
