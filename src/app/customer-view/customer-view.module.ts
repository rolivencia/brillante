import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerViewRoutingModule } from './customer-view-routing.module';
import { CustomerViewComponent } from './customer-view.component';
import { FooterComponent } from '../_components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [CustomerViewComponent, FooterComponent],
    imports: [CommonModule, FontAwesomeModule, CustomerViewRoutingModule],
})
export class CustomerViewModule {}
