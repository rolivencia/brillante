import { Component, OnInit } from '@angular/core';
import { CardsLayoutService } from '@components/cards-layout/cards-layout.service';

@Component({
    selector: 'app-cards-layout',
    templateUrl: './cards-layout.component.html',
    styleUrls: ['./cards-layout.component.scss'],
})
export class CardsLayoutComponent implements OnInit {
    constructor(public cardsLayoutService: CardsLayoutService) {}

    ngOnInit() {}
}
