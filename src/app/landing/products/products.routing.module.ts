import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './product-detail/product-detail.resolver.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListResolverService } from './products-list/products-list-resolver.service';

const routes: Routes = [
    {
        path: 'product-detail/:id',
        component: ProductDetailComponent,
        resolve: {
            product: ProductDetailResolverService,
        },
    },
    {
        path: '',
        component: ProductsListComponent,
        resolve: {
            products: ProductsListResolverService,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
