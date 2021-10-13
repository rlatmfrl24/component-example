import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userNameState, loginState } from "../store/basic";

export const Login = () => {
  const setUserName = useSetRecoilState(userNameState);
  const setIsLogin = useSetRecoilState(loginState);
  const [inputName, setInputName] = useState("");

  return (
    <div>
      <div>Login</div>
      <div>
        <input
          id="nickname"
          placeholder="nickname"
          onChange={(event) => {
            setInputName(event.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setUserName(inputName);
            setIsLogin(true);
          }}
        >
          login
        </button>
      </div>
    </div>
  );
};
