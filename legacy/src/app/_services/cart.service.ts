import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cart: BehaviorSubject<OrderDetail[]> = new BehaviorSubject([]);
    private order: Order; // Used for checkout and saving of information once a customer buys

    constructor() {}

    public get(): Observable<OrderDetail[]> {
        return this.cart;
    }

    public add(product: Product, quantity: number = 1): void {
        // Check if product doesn't exist before addition
        const productAlreadyinCart: OrderDetail = this.cart.value.find((x: OrderDetail) => x.product.id === product.id);
        if (!productAlreadyinCart) {
            this.cart.next(this.cart.value.concat({ product: product, quantity: quantity }));
            localStorage.setItem('cart', JSON.stringify(this.cart.value));
        }
    }

    public update(orderDetail: OrderDetail) {
        const index = _.findIndex(this.cart.value, (x) => x.product.id === orderDetail.product.id);
        const updatedCart = [].concat(this.cart.value);
        updatedCart[index] = orderDetail;
        this.cart.next(updatedCart);
    }

    public clear() {
        this.cart.next([]);
    }

    public delete(product: Product) {
        this.cart.next(this.cart.value.filter((x: OrderDetail) => x.product.id !== product.id));
    }

    public calculatePrice(): number {
        return this.cart.value.reduce((cartPrice, current) => cartPrice + current.product.price * current.quantity, 0);
    }

    //TODO: Finish implementation for checkout

    public checkout() {
        this.order = { details: this.cart.value, date: new Date() };
        this.cart.next([]);
        localStorage.removeItem('cart');
    }

    public loadFromStorage() {
        const storageValue = JSON.parse(localStorage.getItem('cart'));
        this.cart.next(storageValue ? storageValue : []);
    }
}

// TODO: Move these interface declarations to their own file.
export interface Order {
    details: OrderDetail[];
    date: Date;
}

export interface OrderDetail {
    product: Product;
    quantity: number;
    appliedDiscount?: number;
}
