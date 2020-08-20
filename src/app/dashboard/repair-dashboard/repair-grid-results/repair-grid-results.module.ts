import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { RepairGridResultsComponent } from '@app/dashboard/repair-dashboard/repair-grid-results/repair-grid-results.component';
import { RepairGridResultsRoutingModule } from './repair-grid-results-routing.module';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

@NgModule({
    declarations: [RepairGridResultsComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        RepairGridResultsRoutingModule,
        WjGridModule,
        WjGridFilterModule,
        WjInputModule,
    ],
})
export class RepairGridResultsModule {}
