import Store from "./Store";
import { makeObservable, runInAction } from "mobx";
import AppStore from "./AppStore";
import SaleModel, { ISale } from "../models/SaleModel";


export default class UserStore extends Store<ISale,SaleModel> {
  items = new Map<string, SaleModel>();
  loading: boolean = true;

  constructor(store: AppStore) {
    super(store);
    makeObservable(this, {
      loading: true,
    });
    this.store = store;
  }

  load(items: ISale[]) {
    runInAction(() => {
      items.forEach((item) =>
        this.items.set(item.id, new SaleModel(this.store, item))
      );
    });
  }
}
