import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function getDocsFromFB({ path, condition }) {
  const dataList = [];
  let querySnapshot = null;
  if (condition) {
    const [con1, con2, con3] = condition;
    querySnapshot = await getDocs(
      query(collection(db, path), where(con1, con2, con3))
    );
  } else {
    querySnapshot = await getDocs(query(collection(db, path)));
  }
  querySnapshot.forEach((doc) => dataList.push(doc.data()));
  return dataList;
}
