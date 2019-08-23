import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
    currentUser: User;

    private _adminLinks = [
        { label: 'Inicio', route: '/', enabled: true, visible: true },
        { label: 'Dashboard', route: '/dashboard', enabled: true, visible: true },
        { label: 'Clientes', route: '/client', enabled: true, visible: true },
        {
            label: 'Reparaciones',
            route: 'repair',
            enabled: true,
            visible: true
        },
        { label: 'Caja', route: '/caja', enabled: false, visible: true },
        { label: 'Stock', route: '/stock', enabled: false, visible: true }
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
            visible: true
        },
        { label: 'Novedades', route: 'news', enabled: false, visible: true },
        { label: 'Contacto', route: 'contact', enabled: true, visible: true }
    ];

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    }

    ngOnInit() {
        // localStorage.clear('users');
        // localStorage.setItem('users', JSON.stringify(this.usersList));
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    get welcomeName() {
        return `${this.currentUser.avatar} ${this.currentUser.firstName}`;
    }

    get userLinks() {
        return this.currentUser ? this._adminLinks : this._userLinks;
    }
}
