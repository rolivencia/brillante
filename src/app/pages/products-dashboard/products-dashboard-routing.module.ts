import { NgModule } from '@angular/core';
import { ProductsDashboardComponent } from './products-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDashboardGuard } from './products-dashboard.guard';

const routes: Routes = [{ path: '', component: ProductsDashboardComponent, canActivate: [ProductsDashboardGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsDashboardRoutingModule {}
