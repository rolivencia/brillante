import { CashGridResultsComponent } from './cash-grid-results.component';
import { CashGridResultsRoutingModule } from './cash-grid-results-routing.module';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
    declarations: [CashGridResultsComponent],
    imports: [CashGridResultsRoutingModule, CommonModule, FormsModule, GridModule, NgbDatepickerModule],
})
export class CashGridResultsModule {}
