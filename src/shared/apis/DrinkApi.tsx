import {
  query,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
} from "@firebase/firestore";
import { Unsubscribe, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

import AppStore from "../stores/AppStore";
import AppApi from "./AppApi";
import { IDrink } from "../models/DrinkModel";

export default class DrinkApi {
  path: string | null = null;

  constructor(private api: AppApi, private store: AppStore) {}

  getPath() {
    return "drink";
  }

  /**
   * * const newTodo = {
   *      ...defaultTodo,
   *      task: "My Task",
   * }
   */

  //* to create a document, use => await api.todo.create(newTodo);
  async create(drink: IDrink) {
    // set path to "todos" path is collection name
    const path = this.getPath();
    if (!path) return;

    // get auto generated ID from firestore to use as document ID
    const itemRef = doc(collection(db, path));

    //assign the document ID to our ID field in the document
    drink.id = itemRef.id;

    // use firestore function setDoc to create new document in the specified database and collection
    /**
     * @param doc is also a firestore type
     * @param db is the database name defined in the firebase config file
     * @param path is the collection name
     * @param drink is the data form e.g form as IDrink
     *
     */
    try {
      await setDoc(itemRef, drink, { merge: true }); // create the document
      this.store.drink.load([drink]); // * load the todo store with the newly created item
    } catch (error) {
      console.log(error);
    }
  }

  async update(item: IDrink) {
    const path = this.getPath();
    if (!path) return;

    try {
      await updateDoc(doc(db, path, item.id), {
        ...item,
      });
      this.store.drink.load([item]);
    } catch (error) {}
  }

  async delete(drink: IDrink) {
    const path = this.getPath();
    if (!path) return;

    const docRef = doc(db, path, drink.id);
    await deleteDoc(docRef);
    this.store.drink.remove(drink.id);
  }

  async getAll() {
    // get the collection name
    const path = this.getPath();
    if (!path) return;

    // remove all items from store
    this.store.drink.removeAll();

    // create the query
    const $query = query(collection(db, path));
    // new promise
    return await new Promise<Unsubscribe>((resolve, reject) => {
      // on snapshot
      const unsubscribe = onSnapshot(
        $query,
        // onNext
        (querySnapshot) => {
          const items: IDrink[] = [];
          querySnapshot.forEach((doc) => {
            const todo = { id: doc.id, ...doc.data() } as IDrink;
            items.push(todo);
          });

          this.store.drink.load(items);

          resolve(unsubscribe);
        },
        // onError
        (error) => {
          reject();
        }
      );
    });
  }

  async getById(id: string) {
    const path = this.getPath();
    if (!path) return;

    const unsubscribe = onSnapshot(doc(db, path, id), (doc) => {
      if (!doc.exists) return;
      const item = { id: doc.id, ...doc.data() } as IDrink;

      this.store.drink.load([item]);
    });
    return unsubscribe;
  }

  async removeAll() {
    const path = this.getPath();
    if (!path) return;

    try {
      // Get all documents in the collection
      const querySnapshot = await getDocs(collection(db, path));

      // Delete each document
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Clear the store
      this.store.drink.removeAll();
    } catch (error) {
      console.error(error);
    }
  }

  select(drink: IDrink) {
    // Set the selected item in the store
    this.store.drink.select(drink);
  }

  get selected(): IDrink | null {
    // Get the selected item from the store
    return this.store.drink.selected;
  }
}