import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsDashboardComponent } from './settings-dashboard.component';

const routes: Routes = [{ path: '', component: SettingsDashboardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsDashboardRoutingModule {}
