import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepairDashboardComponent} from '@app/views/repair-dashboard/repair-dashboard.component';

const routes: Routes = [
  { path: '', component: RepairDashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairDashboardRoutingModule { }
