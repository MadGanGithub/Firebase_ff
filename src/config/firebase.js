import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState,useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {v4} from "uuid";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNIPnvxnns_prnjBxaOUMuj9q8zx3Lvbs",
    authDomain: "internproject-3e473.firebaseapp.com",
    projectId: "internproject-3e473",
    storageBucket: "internproject-3e473.appspot.com",
    messagingSenderId: "702020002922",
    appId: "1:702020002922:web:149d867e4951145e9d5613",
    measurementId: "G-CXVF6B2JTG",
    databaseURL:"https://internproject-3e473-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

//Settings
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const analytics = getAnalytics(app);
export const storage=getStorage(app)
export const database=getDatabase(app)

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, `/images/${currentUser.uid}/profile/${file.name+v4()}.png`);

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}

export async function uploadQuote(file, currentUser, setLoading) {
  const fileRef = ref(storage, `/images/${currentUser.uid}/quotes/${file.name+v4()}.png`);

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}

export async function uploadPurchase(file, currentUser, setLoading) {
  const fileRef = ref(storage, `/images/${currentUser.uid}/purchase/${v4()}.png`);

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}