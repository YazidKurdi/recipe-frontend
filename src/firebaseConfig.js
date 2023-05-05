const apiKey = process.env.VUE_APP_API_KEY_FIREBASE;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "django-recipe-8db0c.firebaseapp.com",
  projectId: "django-recipe-8db0c",
  storageBucket: "django-recipe-8db0c.appspot.com",
  messagingSenderId: "668097519626",
  appId: "1:668097519626:web:aaf81891951d42edf23ff3"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp
