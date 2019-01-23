import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';
import {User} from './_models';
import {RepairService} from '@app/_services/repair.service';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component(
  {
    selector: 'app-brillante',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
  })
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get welcomeName() {
    return `🙋 ${this.currentUser.firstName}`;
  }
}
