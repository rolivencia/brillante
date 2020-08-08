import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    currentUser: User;

    //FIXME: Centralizar navegación
    private _adminLinks = [
        { label: 'Dashboard', route: '/dashboard', enabled: true, visible: true },
        { label: 'Clientes', route: '/client-dashboard', enabled: true, visible: true },
        {
            label: 'Reparaciones',
            route: ['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
        },
        {
            label: 'Caja',
            route: ['/cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected' } }],
            enabled: true,
            visible: true,
        },
        { label: 'Stock', route: '/products-dashboard', enabled: true, visible: true },
    ];

    private _userLinks = [
        { label: 'Inicio', route: '/home', enabled: true, visible: false },
        { label: 'Productos', route: '/products', enabled: true, visible: true },
        { label: 'Celulares', route: '/smartphones', enabled: false, visible: true },
        { label: 'Reparaciones', route: '/repairs', enabled: true, visible: true },
        {
            label: 'Servicio a empresas',
            route: 'enterprise',
            enabled: true,
            visible: true,
        },
        { label: 'Novedades', route: 'news', enabled: false, visible: true },
        { label: 'Contacto', route: 'contact', enabled: true, visible: true },
    ];

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    ngOnInit() {}

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    get welcomeName() {
        return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }

    get userLinks() {
        return this.currentUser ? this._adminLinks : this._userLinks;
    }
}
