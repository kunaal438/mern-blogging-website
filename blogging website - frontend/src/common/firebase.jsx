import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhcpe7z8pJvCXYn3wtY996y_s4lThiET0",
  authDomain: "blogging-website-social-c604a.firebaseapp.com",
  projectId: "blogging-website-social-c604a",
  storageBucket: "blogging-website-social-c604a.appspot.com",
  messagingSenderId: "394799890431",
  appId: "1:394799890431:web:a3c4cb7b79f1f6fe0571ca"
};

const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}