import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashUpdateRoutingModule } from './cash-update-routing.module';
import { CashUpdateComponent } from './cash-update.component';


@NgModule({
  declarations: [CashUpdateComponent],
  imports: [
    CommonModule,
    CashUpdateRoutingModule
  ]
})
export class CashUpdateModule { }
