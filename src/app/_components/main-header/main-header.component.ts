import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faShoppingCart, faTimes, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OfficeBranchService } from '@services/office-branch.service';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';
import { NavigationService } from '@services/navigation.service';
import { Observable } from 'rxjs';

export interface NavigationLink {
    id: string;
    text: string;
    route: string | Object;
    enabled: boolean;
    visible: boolean;
    roles?: number[];
    icon?: IconDefinition;
    type: NavigationLinkType;
}

export type NavigationLinkType = 'Internal' | 'External';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    @Input() showToggler: boolean = false;
    @Input() sidebarOpen: boolean = false;
    @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

    get userLinks(): NavigationLink[] {
        return this.navigationService.userLinks;
    }

    get adminLinks(): NavigationLink[] {
        return this._adminLinks;
    }

    public currentUser$: Observable<User>;

    public barsIcon: IconDefinition = faBars;
    public closeIcon: IconDefinition = faTimes;
    public cartIcon: IconDefinition = faShoppingCart;
    public userIcon: IconDefinition = faUser;

    private _adminLinks: NavigationLink[] = [];

    public showCart: boolean = true; //TODO: Remove this when cart module is ready

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public officeBranchService: OfficeBranchService,
        public navigationService: NavigationService
    ) {
        this.currentUser$ = this.authenticationService.currentUser.asObservable();
    }

    ngOnInit() {
        this.authenticationService.currentUser.subscribe((user) => {
            if (user) {
                const currentUserRoles = user.roles.map((UserRole) => UserRole.id);
                this._adminLinks = this.navigationService.allAdminLinks.filter((Link) =>
                    Link.roles.some((role) => currentUserRoles.includes(role))
                );
            }
            this.showCart = !!user;
        });
    }

    logout() {
        this.authenticationService.logout();
        this._adminLinks = [];
        this.router.navigate(['/']);
    }

    public onToggleSidebar() {
        this.toggleSidebar.emit(!this.sidebarOpen);
    }
}
