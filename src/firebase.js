
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCWZPxGmrOj7YTX-8WwaJ6v_27bzPrzRjQ",
  authDomain: "netflix-clone-ab92b.firebaseapp.com",
  projectId: "netflix-clone-ab92b",
  storageBucket: "netflix-clone-ab92b.firebasestorage.app",
  messagingSenderId: "551774909051",
  appId: "1:551774909051:web:8c704c753967cfcb6728de"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
   const res =  await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   })
  } catch (err) {
    console.error(err);
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
};

const login = async(email, password)=>{
   try{
      await signInWithEmailAndPassword(auth, email, password);
   }catch(err){
     console.error(err);
     toast.error(err.code.split('/')[1].split('-').join(" "));
   }
}

const logout = ()=>{
   signOut(auth);
}

export {auth, db, signup, login, logout };
