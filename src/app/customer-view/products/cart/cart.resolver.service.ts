import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product } from '@models/product';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartResolverService implements Resolve<Product[]> {
    constructor() {}

    resolve(): Observable<Product[]> {
        return of([]);
    }
}
