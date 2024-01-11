import AppStore from "../stores/AppStore";

import AuthApi from "./AuthApi";
import DrinkApi from "./DrinkApi";
import UserApi from "./UserApi";





export default class AppApi {
  auth: AuthApi;
  user: UserApi;
  drink: DrinkApi;
  // todo: ToDoApi;
  
  /**
   * ! added by Werner, not fully tested
   * */

  constructor(store: AppStore) {
    /**
     * ! added by Werner, not fully tested
     * */

    this.auth = new AuthApi(this, store);
    this.drink = new DrinkApi(this,store)
    //  this.todo = new ToDoApi(this, store);

    this.user = new UserApi(this, store);
  }
}
