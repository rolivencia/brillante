import { NgModule } from '@angular/core';
import { ProductsDashboardComponent } from '@management-view/products-dashboard/products-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProductsDashboardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsDashboardRoutingModule {}