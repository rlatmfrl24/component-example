import React from "react";
import "./App.css";
import { Main } from "./pages/Main";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Main />
      </div>
    </RecoilRoot>
  );
}

export default App;
