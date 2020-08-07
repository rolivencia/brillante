import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashGridResultsRoutingModule } from './cash-grid-results-routing.module';
import { CashGridResultsComponent } from './cash-grid-results.component';


@NgModule({
  declarations: [CashGridResultsComponent],
  imports: [
    CommonModule,
    CashGridResultsRoutingModule
  ]
})
export class CashGridResultsModule { }
