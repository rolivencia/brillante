import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsHttpService } from './products.http.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsRoutingModule } from './products.routing.module';
import { ProductsService } from './products.service';
import { ProductsComponent } from './products.component';

@NgModule({
    declarations: [ProductsComponent, ProductsListComponent, ProductDetailComponent],
    imports: [CommonModule, ProductsRoutingModule],
    providers: [ProductsService, ProductsHttpService],
})
export class ProductsModule {}
