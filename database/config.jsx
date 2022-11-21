// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyASjZ1fMlK4WPPCd3tygXZ66jVQr24vWv8",
  authDomain: "crud-firebase-a2b03.firebaseapp.com",
  projectId: "crud-firebase-a2b03",
  storageBucket: "crud-firebase-a2b03.appspot.com",
  messagingSenderId: "114688828990",
  appId: "1:114688828990:web:579b4699646b48f283536f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
 

export const db = getFirestore (app)