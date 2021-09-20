import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { toProduct } from '@app/landing/products/products.service';
import { HttpClient } from '@angular/common/http';
import { Category, Manufacturer, Product } from '@app/_models/product';

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

    public get({ offset, manufacturer, category }): Observable<Product[]> {
        return this.http.get<Product[]>(
            `${environment.apiUrl}/products/getAll?offset=${offset}&manufacturer=${manufacturer}&category=${category}`
        );
        // .pipe(map((productsDTO) => productsDTO.map((productDTO) => toProduct(productDTO))));
    }

    public getManufacturers(): Observable<Manufacturer[]> {
        return this.http.get<Manufacturer[]>(`${environment.apiUrl}/products/getManufacturers`);
        // .pipe(map((productsDTO) => productsDTO.map((productDTO) => toProduct(productDTO))));
    }

    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}/products/getCategories`);
    }
}
