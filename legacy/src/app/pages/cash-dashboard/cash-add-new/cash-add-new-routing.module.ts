import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashAddNewComponent } from '@pages/cash-dashboard/cash-add-new/cash-add-new.component';

const routes: Routes = [{ path: '', component: CashAddNewComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashAddNewRoutingModule {}
