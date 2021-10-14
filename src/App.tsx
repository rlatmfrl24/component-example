import React, { useEffect } from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { RecoilRoot } from "recoil";
import firebase from "firebase";
require("dotenv").config();

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "dontpanic-zerone.firebaseapp.com",
      projectId: "dontpanic-zerone",
      storageBucket: "dontpanic-zerone.appspot.com",
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    if (!firebase.apps.length) {
      // Make sure initialization happens only once
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }, []);

  return (
    <RecoilRoot>
      <div className="App">
        <Main />
      </div>
    </RecoilRoot>
  );
}

export default App;
