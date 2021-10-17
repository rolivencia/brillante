import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepairsComponent } from '@app/customer-view/repairs/repairs.component';

const routes: Routes = [{ path: '', component: RepairsComponent, pathMatch: 'full' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairsRoutingModule {}
