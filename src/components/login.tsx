import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userNameState, loginState, userDataState } from "../store/basic";

export const Login = () => {
  const setUserName = useSetRecoilState(userNameState);
  const setUserData = useSetRecoilState(userDataState);
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

            axios({
              method: "POST",
              url: "https://us-central1-dontpanic-zerone.cloudfunctions.net/loginUser",
              data: {
                nickname: inputName,
                slimeColor: "blue",
                userSkill: ["html", "css"],
              },
            })
              .then((response) => {
                setUserData(JSON.parse(JSON.stringify(response.data)));
                setIsLogin(true);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          login
        </button>
      </div>
    </div>
  );
};
