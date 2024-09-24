import Store from "./Store";
import AppStore from "./AppStore";
import { runInAction, toJS } from "mobx";
import InventoryModel, { IInventoryItem } from "../models/InventoryModel";

export default class InventoryStore extends Store<IInventoryItem, InventoryModel> {
    items = new Map<string, InventoryModel>();

    constructor(store: AppStore) {
        super(store);
        this.store = store;
    }

    load(items: IInventoryItem[] = []) {
        runInAction(() => {
            items.forEach((item) =>
                this.items.set(item.id, new InventoryModel(this.store, item))
            );
        });
    }

    getByItemId(itemId: string) {
        const list = Array.from(toJS(this.items.values()));
        return list.find((item) => item.asJson.id === itemId);
    }

    getAllInventoryItems(): InventoryModel[] {
        return Array.from(this.items.values());
    }
}
