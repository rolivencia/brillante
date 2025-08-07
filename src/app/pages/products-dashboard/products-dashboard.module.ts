import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsDashboardRoutingModule } from './products-dashboard-routing.module';
import { ProductsDashboardComponent } from './products-dashboard.component';

@NgModule({
    declarations: [ProductsDashboardComponent],
    imports: [CommonModule, ProductsDashboardRoutingModule],
})
export class ProductsDashboardModule {}
