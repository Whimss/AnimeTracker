// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG1GibtsSbSc2vh79kUgQe0SP73oAJF1o",
  authDomain: "animetracker-bd18c.firebaseapp.com",
  projectId: "animetracker-bd18c",
  storageBucket: "animetracker-bd18c.firebasestorage.app",
  messagingSenderId: "44552429061",
  appId: "1:44552429061:web:e83051c40360e1f9dfc66c",
  measurementId: "G-T0ZSFNH0VV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider };