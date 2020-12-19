import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { toProduct } from '@app/landing/products/products.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@app/_models/product';

@Injectable({
    providedIn: 'root',
})
export class ProductsHttpService {
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
