import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Category, Manufacturer } from '../../_models/product';
import { Observable, zip } from 'rxjs';
import { ProductsHttpService } from './products.http.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductsResolverService implements Resolve<{ manufacturers: Manufacturer[]; categories: Category[] }> {
    constructor(private productsHttpService: ProductsHttpService) {}

    resolve(): Observable<{ manufacturers: Manufacturer[]; categories: Category[] }> {
        return zip(this.productsHttpService.getManufacturers(), this.productsHttpService.getCategories()).pipe(
            map(([manufacturers, categories]) => ({ manufacturers: manufacturers, categories: categories }))
        );
    }
}
