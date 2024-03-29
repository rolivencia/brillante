import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
    public users: User[] = [];
    constructor(public userService: UserService) {}

    ngOnInit(): void {
        this.loadAllUsers();
    }

    public deleteUser(id: number) {
        this.userService
            .delete(id)
            .pipe(first())
            .subscribe(() => {
                this.loadAllUsers();
            });
    }

    private loadAllUsers() {
        this.userService
            .getAll()
            .pipe(first())
            .subscribe((users) => {
                this.users = users;
            });
    }
}
