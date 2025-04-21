
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAt1oABEydxniUHyw5qVm_gUNdw1AWBf5c",
    authDomain: "oasparks-final-db.firebaseapp.com",
    projectId: "oasparks-final-db",
    storageBucket: "oasparks-final-db.firebasestorage.app",
    messagingSenderId: "462736233439",
    appId: "1:462736233439:web:bd7e6c397ed171f76b6a6a",
    measurementId: "G-T0L6QDWSDN"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
