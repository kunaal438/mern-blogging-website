// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA71lmSsmky68bNOip8fzhz3G2t1g-xE6A",
  authDomain: "react-js-blog-website-yt-bf3e5.firebaseapp.com",
  projectId: "react-js-blog-website-yt-bf3e5",
  storageBucket: "react-js-blog-website-yt-bf3e5.appspot.com",
  messagingSenderId: "305090570704",
  appId: "1:305090570704:web:44efe67db4cd32bbabf1d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const provider =new GoogleAuthProvider()
const auth = getAuth();

export const authWithGoogle = async () =>{
    let user = null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user = result.user
    }).catch((err)=>{
        console.log(err)
    })
    return user
}