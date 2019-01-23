import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';
import {User} from './_models';

@Component(
  {
    selector: 'app-brillante',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
  })
export class AppComponent implements OnInit {
  currentUser: User;

  // FIXME: Remove this and apply real checking of the user/pass controlling with the Wordpress Database
  private usersList: User[] = [
    {
      firstName: 'Ramiro',
      lastName: 'Olivencia',
      username: 'rolivencia',
      password: 'abacab@270156',
      id: 1,
      token: 'fake-jwt-token',
      avatar: '🧑🏻'
    },
    {
      firstName: 'Carlos',
      lastName: 'Barreto',
      username: 'cbarreto',
      password: 'Conestolarompemos3',
      id: 2,
      token: 'fake-jwt-token',
      avatar: '🧑🏿'
    },
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    // localStorage.clear('users');
    localStorage.setItem('users', JSON.stringify(this.usersList));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get welcomeName() {
    return `${this.currentUser.avatar} ${this.currentUser.firstName}`;
  }
}
