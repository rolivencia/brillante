import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [ContactComponent],
    imports: [CommonModule, ContactRoutingModule, FontAwesomeModule],
})
export class ContactModule {}
