import { Injectable } from '@angular/core';
import { Product } from '../products-list/products-list.component';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@app/landing/products/products.service';

@Injectable({
    providedIn: 'root',
})
export class ProductDetailResolverService implements Resolve<Product> {
    constructor(private productsService: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        const id: string = route.paramMap.get('id');
        return this.productsService.getById(id);
    }
}
