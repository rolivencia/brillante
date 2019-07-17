import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { User } from "@app/_models";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  private _adminLinks = [
    { label: "Inicio", route: "/", enabled: false, visible: true },
    { label: "Dashboard", route: "/dashboard", enabled: true, visible: true },
    { label: "Clientes", route: "/client", enabled: true, visible: true },
    {
      label: "Reparaciones",
      route: "repair",
      enabled: true,
      visible: true
    },
    { label: "Caja", route: "/caja", enabled: false, visible: true },
    { label: "Stock", route: "/stock", enabled: false, visible: true }
  ];

  private _userLinks = [
    { label: "Inicio", route: "/home", enabled: false, visible: false },
    { label: "Productos", route: "/home", enabled: false, visible: true },
    { label: "Celulares", route: "/home", enabled: false, visible: true },
    { label: "Reparaciones", route: "/home", enabled: false, visible: true },
    {
      label: "Servicio a empresas",
      route: "home",
      enabled: false,
      visible: true
    },
    { label: "Novedades", route: "home", enabled: false, visible: true },
    { label: "Contacto", route: "home", enabled: false, visible: true }
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    // localStorage.clear('users');
    // localStorage.setItem('users', JSON.stringify(this.usersList));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  get welcomeName() {
    return `${this.currentUser.avatar} ${this.currentUser.firstName}`;
  }

  get routerLinks() {
    return this.currentUser ? this._adminLinks : this._userLinks;
  }
}
