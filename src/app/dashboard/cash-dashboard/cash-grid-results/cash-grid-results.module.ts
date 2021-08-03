import { CashGridResultsComponent } from './cash-grid-results.component';
import { CashGridResultsRoutingModule } from './cash-grid-results-routing.module';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CashGridResultsComponent],
    imports: [
        CashGridResultsRoutingModule,
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        WjGridFilterModule,
        WjGridModule,
    ],
})
export class CashGridResultsModule {}
