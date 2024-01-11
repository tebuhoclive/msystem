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
import { authWorker, db } from "../config/firebase-config";
import { IUser } from "../models/User";
import AppStore from "../stores/AppStore";
import AppApi from "./AppApi";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

export default class UserApi {
  path: string | null = null;

  constructor(private api: AppApi, private store: AppStore) { }

  getPath() {
    return "users";
  }

  async getAll() {
    // get the db path
    const path = this.getPath();
    if (!path) return;

    // remove all items from store
    this.store.user.removeAll();

    // create the query
    const $query = query(collection(db, path));
    // new promise
    return await new Promise<Unsubscribe>((resolve, reject) => {
      // on snapshot
      const unsubscribe = onSnapshot(
        $query,
        // onNext
        (querySnapshot) => {
          const items: IUser[] = [];
          querySnapshot.forEach((doc) => {
            const user = { uid: doc.id, ...doc.data() } as IUser;

            const DEV_MODE =
              !process.env.NODE_ENV || process.env.NODE_ENV === "development";
            if (DEV_MODE) items.push(user);
            // else if (!user.devUser) items.push(user);
          });

          this.store.user.load(items);
          resolve(unsubscribe);
        },
        // onError
        (error) => {
          reject();
        }
      );
    });
  }

  async delete(user: IUser) {
    const path = this.getPath();
    if (!path) return;

    const docRef = doc(db, path, user.uid);
    await deleteDoc(docRef);
    this.store.user.remove(user.uid)
  }

  // async create(user: IUser) {

  //   const path = this.getPath();
  //   if (!path) return;

  //   const { email, password = `123456///` } = user;
  //   const userCredential = await createUserWithEmailAndPassword(authWorker, email, password).catch((error) => {
  //     return null;
  //   });

  //   if (userCredential) {
  //     user.uid = userCredential.user.uid;
  //     user.password = "";
  //     await setDoc(doc(db, path, user.uid), user);
  //     this.store.user.load([user])
  //     sendPasswordResetEmail(authWorker, email)
  //     await signOut(authWorker);
  //   }
  //   return user;
  // }

  async create(user: IUser) {
    const path = this.getPath();
    if (!path) return;

    const { email, password = `123456///` } = user;

    try {
      const userCredential = await createUserWithEmailAndPassword(authWorker, email, password);
      
      if (userCredential) {
        user.uid = userCredential.user.uid;
        user.password = "";
        
        // Log user creation success
        console.log("User created successfully:", user);

        await setDoc(doc(db, path, user.uid), user);
        this.store.user.load([user]);

        // Send password reset email
        await sendPasswordResetEmail(authWorker, email);

        // Sign out the user
        await signOut(authWorker);

        // Log user creation and sign-out success
        console.log("User creation and sign-out successful.");

        return user;
      }
    } catch (error) {
      // Log any errors that occur during user creation
      console.error("Error creating user:", error);
      return null;
    }
  }

  async update(item: IUser) {
    const path = this.getPath();
    if (!path) return;

    try {
      await updateDoc(doc(db, path, item.uid), {
        ...item,
      });
      this.store.user.load([item]);
    } catch (error) {
    }
  }

  async getByUid(uid: string) {
    const path = this.getPath();
    if (!path) return;

    const unsubscribe = onSnapshot(doc(db, path, uid), (doc) => {
      if (!doc.exists) return;
      const item = { uid: doc.id, ...doc.data() } as IUser;

      this.store.user.load([item]);
    });
    return unsubscribe;
  }
}
