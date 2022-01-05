import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { Moment } from 'moment';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cart: OrderDetail[];
    private order: Order; // Used for checkout and saving of information once a customer buys

    constructor() {}

    public get(): OrderDetail[] {
        return this.cart;
    }

    public add(product: Product, quantity: number = 1): void {
        // Check if product doesn't exist before addition
        const productAlreadyinCart: OrderDetail = this.cart.find((x: OrderDetail) => x.product.id === product.id);
        if (!productAlreadyinCart) {
            this.cart = this.cart.concat({ product: product, quantity: quantity });
        }
    }

    public clear() {
        this.cart = [];
    }

    public delete(product: Product) {
        this.cart = this.cart.filter((x: OrderDetail) => x.product.id === product.id);
    }

    public calculatePrice(): number {
        return this.cart.reduce((cartPrice, current) => cartPrice + current.product.price * current.quantity, 0);
    }

    public checkout() {
        //TODO: Implement this method for checkout
    }
}

export interface Order {
    details: OrderDetail[];
    date: Moment; // TODO: Change for day.js before final implementation
}

export interface OrderDetail {
    product: Product;
    quantity: number;
    appliedDiscount?: number;
}
