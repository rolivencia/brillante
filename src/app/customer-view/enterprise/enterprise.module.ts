import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterpriseComponent } from './enterprise.component';

@NgModule({
    declarations: [EnterpriseComponent],
    imports: [CommonModule, EnterpriseRoutingModule],
})
export class EnterpriseModule {}
