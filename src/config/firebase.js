import { initializeApp } from "firebase/app";
import { getFirestore, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/* =============================
        파이어베이스 세팅
============================= */
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

/* =============================
        파이어베이스 기능
============================= */
export async function getDocsFromFB(query) {
  const dataList = [];
  const querySnapshot = await getDocs(query);
  querySnapshot.forEach((doc) => dataList.push(doc.data()));
  return dataList;
}
