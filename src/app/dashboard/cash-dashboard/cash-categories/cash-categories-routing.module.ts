import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashCategoriesComponent } from './cash-categories.component';

const routes: Routes = [{ path: '', component: CashCategoriesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CashCategoriesRoutingModule {}
