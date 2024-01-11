import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../stores/AppStore";

export const defaultDrink: IDrink = {
  id: "",
  name: "",
  cost: 0,
  quantity: 0,
};

export interface IDrink {
  id: string;
  name: string;
  cost: number;
  quantity: number;
}

export default class DrinkModel {
  private _drink: IDrink;

  constructor(private store: AppStore, drink: IDrink) {
    makeAutoObservable(this);
    this._drink = drink;
  }

  get asJson(): IDrink {
    return toJS(this._drink);
  }

  // Add methods for updating or performing operations on a drink, e.g., increase quantity, update cost, etc.
  // You can define actions here to modify the drink data.
}
