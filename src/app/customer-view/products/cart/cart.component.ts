import { Component, OnInit } from '@angular/core';
import { CartService, OrderDetail } from '@services/cart.service';
import { Observable, of } from 'rxjs';
import { Product } from '@models/product';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public cart$: Observable<OrderDetail[]> = of([]);
    public price: number = 0;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cart$ = this.cartService.get();
        this.updatePrice();
    }

    public onChangeQuantity(event: ChangeEventArgs, orderDetail: OrderDetail) {
        this.cartService.update({ product: orderDetail.product, quantity: event.value });
        this.updatePrice();
    }

    public onDelete(product: Product) {
        this.cartService.delete(product);
        this.updatePrice();
    }

    private updatePrice() {
        this.price = this.cartService.calculatePrice();
    }
}
