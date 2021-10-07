import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { EUser } from '@app/_enums/user.enum';
import { faBars, faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OfficeBranchService } from '@app/_services/office-branch.service';

export class NavigationLink {
    label: string;
    route: string | Object;
    enabled: boolean;
    visible: boolean;
    roles?: number[];
}

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    currentUser: User;

    public barsIcon: IconDefinition = faBars;
    public cartIcon: IconDefinition = faShoppingCart;

    private _adminLinks: NavigationLink[] = [];

    //FIXME: Centralizar navegación - Generar service para el header
    private _allAdminLinks: NavigationLink[] = [
        {
            label: 'Dashboard',
            route: '/dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            label: 'Clientes',
            route: '/client-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK],
        },
        {
            label: 'Reparaciones',
            route: ['repair-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            label: 'Caja',
            route: ['/cash-dashboard/manage', { outlets: { left: 'grid', right: 'selected', top: null } }],
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.EMPLOYEE],
        },
        {
            label: 'Productos',
            route: '/products',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            label: 'Stock',
            route: '/products-list-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK, EUser.REPAIRMAN, EUser.EMPLOYEE],
        },
        {
            label: 'Configuración',
            route: '/settings-dashboard',
            enabled: true,
            visible: true,
            roles: [EUser.ADMIN, EUser.OWNER, EUser.COUNTER_CLERK],
        },
    ];

    private _userLinks: NavigationLink[] = [
        { label: 'Inicio', route: '/home', enabled: true, visible: false },
        { label: 'Productos', route: '/products', enabled: true, visible: true },
        { label: 'Celulares', route: '/smartphones', enabled: false, visible: false },
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

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public officeBranchService: OfficeBranchService
    ) {
        this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
    }

    ngOnInit() {
        this.authenticationService.currentUserSubject.subscribe((user) => {
            if (user) {
                const currentUserRoles = user.roles.map((UserRole) => UserRole.id);
                this._adminLinks = this._allAdminLinks.filter((Link) =>
                    Link.roles.some((role) => currentUserRoles.includes(role))
                );
            }
        });
    }

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
