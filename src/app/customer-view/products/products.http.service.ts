import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { toProduct } from '@customer-view/products/products.service';
import { HttpClient } from '@angular/common/http';
import { Category, Manufacturer, Product } from '@models/product';

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

    public get({ offset, manufacturer, category, searchText = '' }): Observable<Product[]> {
        let baseUrl = `${environment.apiUrl}/products/getAll?offset=${offset}&manufacturer=${manufacturer}&category=${category}`;
        if (searchText) {
            baseUrl = baseUrl.concat(`&searchText=${searchText}`);
        }
        return this.http.get<Product[]>(baseUrl);
    }

    public getFeatured(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/products/getFeatured`);
    }

    public getManufacturers(): Observable<Manufacturer[]> {
        return this.http.get<Manufacturer[]>(`${environment.apiUrl}/products/getManufacturers`);
    }

    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}/products/getCategories`);
    }
}
