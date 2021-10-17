import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './product-detail/product-detail.resolver.service';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListResolverService } from './products-list/products-list-resolver.service';
import { ProductsResolverService } from './products.resolver.service';
import { Routes, RouterModule } from '@angular/router';
import { CartResolverService } from './cart/cart.resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        resolve: {
            filters: ProductsResolverService,
        },
        children: [
            {
                path: 'cart',
                loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
                resolve: {
                    cart: CartResolverService,
                },
            },
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductDetailResolverService,
                },
            },
            {
                path: 'products-list/:offset/:manufacturer/:category',
                component: ProductsListComponent,
                resolve: {
                    products: ProductsListResolverService,
                },
            },
            { path: '**', redirectTo: 'products-list/1/all/all' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
