import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard";
import { LoginComponent } from "./login";
import { AuthGuard } from "./_guards";

const appRoutes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: "repair",
    loadChildren:
      "./dashboard/repair-dashboard/repair-dashboard.module#RepairDashboardModule",
    canActivate: [AuthGuard]
  },
  {
    path: "client",
    loadChildren:
      "./dashboard/client-dashboard/client-dashboard.module#ClientDashboardModule",
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

export const routing = RouterModule.forRoot(appRoutes);
