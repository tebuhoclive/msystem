import AppStore from "../stores/AppStore";
import { defaultUser, IUser } from "../models/User";
import AppApi from "./AppApi";
import {
  OAuthProvider,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default class AuthApi {
  private provider = new OAuthProvider("microsoft.com");

  constructor(private api: AppApi, private store: AppStore) {
    this.provider.addScope("mail.read");
    this.provider.addScope("calendars.read");
  }


  async signIn(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.error("Sign-in error:", error);
      return null;
    }
  }

  //Api to add a new user 
  async onSignUp(user: IUser) {
    const { email, password = `${user.firstName}` } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.log(error)
    });

    if (userCredential) {
      user.uid = userCredential.user.uid;
      await setDoc(doc(db, "Users", user.uid), user);
    }
  }

  // Rest of your AuthApi methods (signIn, passwordResetWithEmail, logOut)
}
