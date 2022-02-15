import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailResolverService } from './product-detail/product-detail.resolver.service';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListResolverService } from './products-list/products-list-resolver.service';
import { ProductsResolverService } from './products.resolver.service';
import { Routes, RouterModule } from '@angular/router';
import { CartResolverService } from './cart/cart.resolver.service';
import { PaymentMethodsResolverService } from '@services/payment-methods.resolver.service';
import { AuthGuard } from '@guards/auth.guard';

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
                canActivate: [AuthGuard], // TODO: Remove this guard when cart is implemented
            },
            {
                path: 'product-detail/:id',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductDetailResolverService,
                    paymentMethods: PaymentMethodsResolverService,
                },
            },
            {
                path: 'products-list/:offset/:manufacturer/:category',
                component: ProductsListComponent,
                resolve: {
                    products: ProductsListResolverService,
                    paymentMethods: PaymentMethodsResolverService,
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
