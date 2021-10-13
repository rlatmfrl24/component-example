import React from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBD-pyo965crb_DGgJDNfQPi6KutSnHnU4",
    authDomain: "dontpanic-zerone.firebaseapp.com",
    projectId: "dontpanic-zerone",
    storageBucket: "dontpanic-zerone.appspot.com",
    messagingSenderId: "510449137891",
    appId: "1:510449137891:web:019592d099b977e197edd6",
    measurementId: "G-BW5ZW4MXJ4",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <RecoilRoot>
      <div className="App">
        <Main />
      </div>
    </RecoilRoot>
  );
}

export default App;
