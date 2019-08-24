import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    heroImage: OwlOptions = {
        loop: true,
        margin: 10,
        items: 1,
        nav: false,
        autoplay: true,
        autoWidth: true
    };

    productsCarousel: OwlOptions = {
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                stagePadding: 40
            },
            400: {
                nav: false,
                items: 1,
                margin: 10
            },
            768: {
                nav: true,
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };

    constructor() {}

    ngOnInit() {}
}
