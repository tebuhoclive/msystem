import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FIREBASE_PROJECT } from "./ENV";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = FIREBASE_PROJECT.STAGING_ENV;

const app = initializeApp(firebaseConfig);
const appAuthWorker = initializeApp(firebaseConfig);

export const authWorker = getAuth(appAuthWorker);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

const database = getDatabase(app);

export { database, ref, onValue };

export const getEnvironment = () => {

  switch (firebaseConfig.authDomain) {
    case "ijgmms.firebaseapp.com":
      return { env: "Live", state: "uk-danger" };
    case "ijgmms-development.firebaseapp.com":
      return { env: "Demo", state: "uk-danger" };
    case "ijg-mms-lots-development.firebaseapp.com":
      return { env: "Development", state: "uk-danger" };
    case "ijgmms-testing.firebaseapp.com":
      return { env: "Month End", state: "uk-danger" };
    default:
      break;
  }

};
