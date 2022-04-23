import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.scss'],
})
export class UpdateCustomerComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const customer = this.route.snapshot.data['customer'];
        if (customer) {
            console.log(customer);
        }
    }
}
