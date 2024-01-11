import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../stores/AppStore";

// default class
export const defaultUser: IUser = {
  uid: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// main interface
export interface IUser {
  uid: string;
  firstName: string;
  lastName: string | null;
  email: string;
  password: string;
}


export default class User {
  private _user: IUser;

  constructor(private store: AppStore, user: IUser) {
    makeAutoObservable(this);
    this._user = user;
  }

  get asJson(): IUser {
    return toJS(this._user);
  }

}
