import AppStore from "../stores/AppStore";

import AuthApi from "./AuthApi";
import InventoryApi from "./InventoryApi";
import UserApi from "./UserApi";

export default class AppApi {
  /**
   * ! added by Werner, not fully tested
   * */

  auth: AuthApi;
  user: UserApi;

  // * I added this
  inventory: InventoryApi;



  constructor(store: AppStore) {
    /**
     * ! added by Werner, not fully tested
     * */


    this.auth = new AuthApi(this, store);

    this.user = new UserApi(this, store);
  
    // * I added this
    this.inventory = new InventoryApi(this, store);


  }
}
