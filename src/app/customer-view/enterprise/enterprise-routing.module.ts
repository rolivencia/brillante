import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from '@customer-view/enterprise/enterprise.component';

const routes: Routes = [{ path: '', component: EnterpriseComponent, pathMatch: 'full' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EnterpriseRoutingModule {}
