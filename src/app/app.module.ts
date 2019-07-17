import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor } from "./_helpers";

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AlertComponent } from "./_components";
import { DashboardComponent } from "./dashboard";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { RepairService } from "@app/_services/repair.service";
import { HeaderComponent } from "./_components/header/header.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AlertComponent,
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    RepairService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
