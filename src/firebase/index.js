import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsDozDKo4h65QCnqjiGEKuBfm6sUbzkYA",
  authDomain: "edu-test-cc7ab.firebaseapp.com",
  databaseURL: "https://edu-test-cc7ab-default-rtdb.firebaseio.com",
  projectId: "edu-test-cc7ab",
  storageBucket: "edu-test-cc7ab.appspot.com",
  messagingSenderId: "738901308969",
  appId: "1:738901308969:web:4d056ce5dc113987dace38",
};

const appFirebase = initializeApp(firebaseConfig);

const dbRtdb = getDatabase(appFirebase);
const dbFirestore = getFirestore();
const storage = getStorage(appFirebase);

export { dbFirestore, dbRtdb, appFirebase, storage };
