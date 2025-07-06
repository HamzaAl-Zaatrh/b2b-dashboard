import {Injectable, signal} from '@angular/core';

export interface UserInfo {
  name: string;
  email: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userInfo = signal<UserInfo | null>(null);

  constructor() {
    this.userInfo = {
      name: 'Hamza Yousef',
      email: "hamza@hamzaalzaatrh.com"
    };
  }

  /**
   * Get the user info, if the user info is not set, call the api to get the user info
   * @returns Signal<UserInfo | null>
   */
  getUserInfo() {
    return this._userInfo.asReadonly();
  }

  set userInfo(userInfo: UserInfo | null) {
    // Add some logic ex: set the default avatar if the user photo is not set
    if (userInfo && !userInfo.photo) {
      userInfo.photo = 'img/user.png'; // Set a default avatar
    }
    this._userInfo.set(userInfo);
  }
}
