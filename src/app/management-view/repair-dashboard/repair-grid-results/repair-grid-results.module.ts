import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RepairGridResultsComponent } from '@management-view/repair-dashboard/repair-grid-results/repair-grid-results.component';
import { RepairGridResultsRoutingModule } from './repair-grid-results-routing.module';

@NgModule({
    declarations: [RepairGridResultsComponent],
    imports: [CommonModule, FormsModule, GridModule, NgbDatepickerModule, RepairGridResultsRoutingModule],
})
export class RepairGridResultsModule {}
