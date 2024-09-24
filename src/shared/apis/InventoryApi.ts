import {
  query,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import AppStore from "../stores/AppStore";
import AppApi from "./AppApi";
import { IInventoryItem} from "../models/InventoryModel";

export default class InventoryApi {
  constructor(private api: AppApi, private store: AppStore) {}

  private productPath() {
    return "inventory";
  }

  async getAll() {
    this.store.inventory.removeAll();
    const path = this.productPath();
    if (!path) return;

    const $query = query(collection(db, path));

    return await new Promise<Unsubscribe>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        $query,
        (querySnapshot) => {
          const products: IInventoryItem[] = [];
          querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as IInventoryItem);
          });
          this.store.inventory.load(products);
          resolve(unsubscribe);
        },
        (error) => {
          reject();
        }
      );
    });
  }

  async getAllProductAccounts() {
    this.store.inventory.removeAll();
    const path = this.productPath();
    if (!path) return;

    const $query = query(collection(db, path));

    return await new Promise<Unsubscribe>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        $query,
        (querySnapshot) => {
          const products: IInventoryItem[] = [];
          querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as IInventoryItem);
          });
          this.store.inventory.load(products);
          resolve(unsubscribe);
        },
        (error) => {
          reject();
        }
      );
    });
  }

  async getById(id: string) {
    const path = this.productPath();
    if (!path) return;

    const unsubscribe = onSnapshot(doc(db, path, id), (doc) => {
      if (!doc.exists) return;
      const item = { id: doc.id, ...doc.data() } as IInventoryItem;
      this.store.inventory.load([item]);
    });

    return unsubscribe;
  }

  async create(item: IInventoryItem) {
    const path = this.productPath();
    if (!path) return;

    const itemRef = doc(collection(db, path), item.id);
    item.id = itemRef.id;

    try {
      await setDoc(itemRef, item, { merge: true });
    } catch (error) {
      console.log(error);
    }
  }

  async update(item: IInventoryItem) {
    const path = this.productPath();
    if (!path) return;

    try {
      await updateDoc(doc(db, path, item.id), {
        ...item,
      });
      this.store.inventory.load([item]);
    } catch (error) {}
  }

 

  async delete(item: IInventoryItem) {
    const path = this.productPath();
    if (!path) return;

    try {
      await deleteDoc(doc(db, path, item.id));
      this.store.inventory.remove(item.id);
    } catch (error) {}
  }
}
