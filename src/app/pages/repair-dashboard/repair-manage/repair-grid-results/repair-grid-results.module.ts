import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RepairGridResultsComponent } from './repair-grid-results.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
    declarations: [RepairGridResultsComponent],
    imports: [CommonModule, FormsModule, GridModule, NgbDatepickerModule, DropDownListModule],
    exports: [RepairGridResultsComponent],
})
export class RepairGridResultsModule {}
