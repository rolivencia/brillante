import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Role, User } from '@models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        const localStorageUserData = JSON.parse(localStorage.getItem('currentUser'));
        const user = localStorageUserData ? new User(localStorageUserData) : null;
        this.currentUser = new BehaviorSubject<User>(user);
    }

    public get currentUserValue(): User {
        return this.currentUser.value;
    }

    login(username: string, password: string): Observable<User> {
        return this.http
            .post<any>(`${environment.apiUrl}/users/authenticate`, {
                username,
                password,
            })
            .pipe(
                map((user) => {
                    // login successful if there's a jwt token in the response
                    let loggedUser: User;
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        loggedUser = new User(user);
                        this.currentUser.next(loggedUser);
                    }

                    return loggedUser;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.next(null);
    }
}

export function hasRoles(roles: Role[], rolesToCheck: number[]) {
    return roles.map((role) => role.id).filter((roleId) => rolesToCheck.includes(roleId)).length > 0;
}
