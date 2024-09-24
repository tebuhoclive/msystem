import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../stores/AppStore";

export const defaultInventoryItem: IInventoryItem = {
    id: "",
    inventoryCode: "",
    itemName: "",
    itemDescription: "",
    quantity: 0,
    reorderLevel: 0,
    lastUpdated: 0,
    createdAt: Date.now(),
}

export interface IInventoryItem {
    id: string;
    inventoryCode: string;
    itemName: string;
    itemDescription: string;
    quantity: number; // Current stock quantity
    reorderLevel: number; // The level at which new stock should be ordered
    lastUpdated: number;
    createdAt: number;
    status?: string; // e.g., "active", "inactive", "discontinued"
}

export interface IInventoryUpdate {
    id: string;
    inventoryCode: string;
    quantity: number; // Updated quantity
}

export interface IInventoryTransaction {
    id: string;
    inventoryCode: string;
    quantityChanged: number; // Positive for incoming stock, negative for outgoing stock
    transactionType: InventoryTransactionType; // "addition" | "removal"
    transactionDate: number;
}

export type InventoryTransactionType = "addition" | "removal";

export class InventoryModel {
    private inventoryItem: IInventoryItem;

    constructor(private store: AppStore, inventoryItem: IInventoryItem) {
        makeAutoObservable(this);
        this.inventoryItem = inventoryItem;
    }

    get asJson(): IInventoryItem {
        return toJS(this.inventoryItem);
    }

    // Example method to update inventory quantity
    updateQuantity(newQuantity: number) {
        this.inventoryItem.quantity = newQuantity;
        this.inventoryItem.lastUpdated = Date.now();
    }

    // Example method to check if reorder is needed
    checkReorderNeeded() {
        return this.inventoryItem.quantity <= this.inventoryItem.reorderLevel;
    }

    // Method to log inventory transactions
    logTransaction(transaction: IInventoryTransaction) {
        // Implement logic to log the transaction
        // This could be stored in a separate transaction history store
    }
}

export default InventoryModel;
