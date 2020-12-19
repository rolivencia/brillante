import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './product-detail/product-detail.resolver.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListResolverService } from './products-list/products-list-resolver.service';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductDetailResolverService,
                },
            },
            {
                path: 'products-list',
                component: ProductsListComponent,
                resolve: {
                    products: ProductsListResolverService,
                },
            },
            { path: '**', redirectTo: 'products-list' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
