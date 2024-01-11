import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../stores/AppStore";

export const defaultSale: ISale = {
  id: "",
  drinkId: "",
  saleDate: new Date(),
  quantitySold: 0,
  totalPrice: 0,
};

export interface ISale {
  id: string;
  drinkId: string;
  saleDate: Date;
  quantitySold: number;
  totalPrice: number;
}

export default class SaleModel {
  private _sale: ISale;

  constructor(private store: AppStore, sale: ISale) {
    makeAutoObservable(this);
    this._sale = sale;
  }

  get asJson(): ISale {
    return toJS(this._sale);
  }

  // Add methods for updating or performing operations on a sale, e.g., calculate total price, update quantity sold, etc.
  // Define actions here to modify the sale data.
}
