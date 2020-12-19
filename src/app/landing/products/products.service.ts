import { Injectable } from '@angular/core';
import { Category, Manufacturer, Product } from '@app/_models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    public manufacturers: Manufacturer[] = [];

    public categories: Category[] = [];

    constructor() {}
}

export function toProduct(productDTO): Product {
    return new Product({ ...productDTO });
}
