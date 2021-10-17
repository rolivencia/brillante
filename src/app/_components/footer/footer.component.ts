import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    instagramIcon: IconDefinition = faInstagram;
    facebookIcon: IconDefinition = faFacebook;
    whatsAppIcon: IconDefinition = faWhatsapp;

    constructor() {}

    ngOnInit() {}
}
