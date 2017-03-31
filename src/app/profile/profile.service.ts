import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';

import { Broadcaster, Notifications, Notification, NotificationType } from 'ngx-base';
import { WIT_API_URL } from 'ngx-fabric8-wit';
import { Profile, User, UserService } from 'ngx-login-client';

import { DummyService } from './../shared/dummy.service';

export class ExtUser extends User {
  attributes: ExtProfile;
}

export class ExtProfile extends Profile {
  store: any;
}

/*
 * A service that manages the users profile
 *
 */
@Injectable()
export class ProfileService {

  private static readonly HEADERS: Headers = new Headers({ 'Content-Type': 'application/json' });
  private profileUrl: string;
  private _loggedInUser: ExtUser;

  constructor(
    private dummy: DummyService,
    private router: Router,
    private broadcaster: Broadcaster,
    userService: UserService,
    @Inject(WIT_API_URL) apiUrl: string,
    private http: Http,
    private notifications: Notifications
  ) {
    this.profileUrl = apiUrl + 'users';
    userService.loggedInUser
      .map(user => cloneDeep(user) as ExtUser)
      .do(user => user.attributes.store = (user as any).contextInformation || {})
      .subscribe(val => {
        this._loggedInUser = val;
      });
  }

  get current(): ExtProfile {
    return this._loggedInUser.attributes;
  }

  save() {
    let profile = cloneDeep(this.current) as any;
    delete profile.username;
    // Handle the odd naming of the field on the API
    profile.contextInformation = profile.store;
    let payload = JSON.stringify({
      data: {
        attributes: profile,
        type: 'identities'
      }
    });
    return this.http
      .patch(this.profileUrl, payload, { headers: ProfileService.HEADERS })
      .map((response) => {
        return response.json().data as User;
      })
      .do(val => this.notifications.message({
        message: 'User profile updated',
        type: NotificationType.SUCCESS
      } as Notification))
      .catch(error => {
        this.notifications.message({
          message: 'Ooops, something went wrong, your profile was not updated',
          type: NotificationType.DANGER
        } as Notification);
        console.log('Error updating user profile', error);
        return Observable.empty();
      });
  }

  get sufficient(): boolean {
    if (this.current &&
      this.current.fullName &&
      this.current.email &&
      this.current.username
      // TODO Add imageURL
      //this.current.imageURL
    ) {
      return true;
    } else {
      return false;
    }
  }

}
