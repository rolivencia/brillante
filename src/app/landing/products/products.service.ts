import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@app/landing/products/products-list/products-list.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    public getById(id: number | string): Observable<Product> {
        return this.http
            .get<Product>(`${environment.apiUrl}/products/getById/${id}`)
            .pipe(map((productDTO) => toProduct(productDTO)));
    }

    public getAll(): Observable<Product[]> {
        return this.http
            .get<Product[]>(`${environment.apiUrl}/products/getAll`)
            .pipe(map((productsDTO) => productsDTO.map((productDTO) => toProduct(productDTO))));
    }
}

export function toProduct(productDTO): Product {
    return new Product({ ...productDTO });
}
