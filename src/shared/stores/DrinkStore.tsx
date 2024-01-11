import { makeObservable, observable, action, runInAction } from "mobx";
import DrinkModel, { defaultDrink, IDrink } from "../models/DrinkModel";
import AppStore from "./AppStore";
import Store from "./Store";

export default class DrinkStore extends Store<IDrink, DrinkModel> {
  items = new Map<string, DrinkModel>();
  loading: boolean = true;

  constructor(store: AppStore) {
    super(store);
    makeObservable(this, {
      loading: true,
    });
    this.store = store;
  }

  load(items: IDrink[]) {
    runInAction(() => {
      items.forEach((item) =>
        this.items.set(item.id, new DrinkModel(this.store, item))
      );
    });
  }
}
