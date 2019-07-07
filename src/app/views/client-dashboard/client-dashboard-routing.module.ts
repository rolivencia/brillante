import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientDashboardComponent} from '@app/views/client-dashboard/client-dashboard.component';

const routes: Routes = [
  { path: '', component: ClientDashboardComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDashboardRoutingModule { }
