import { Component, OnInit } from '@angular/core';
import { faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    public faCheck: IconDefinition = faCheck;

    constructor() {}

    ngOnInit() {}
}
