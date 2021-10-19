import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginState, userDataState } from "../store/basic";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState("");
  const setUserData = useSetRecoilState(userDataState);
  const setIsLogin = useSetRecoilState(loginState);

  return (
    <div>
      <div>Login</div>
      <div>
        <input
          id="nickname"
          placeholder="nickname"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>
      <div>
        <select
          name="user-color"
          onChange={(event) => {
            setUserColor(event.target.value);
          }}
        >
          <option value="">--Please choose an option--</option>

          <option key="mint" value="#06c1c1">
            Mint
          </option>
          <option key="red" value="#f9533b">
            Red
          </option>
          <option key="orange" value="#fea040">
            Orange
          </option>
          <option key="yellow" value="#ffbf2b">
            Yellow
          </option>
          <option key="green" value="#06c17a">
            Green
          </option>
          <option key="blue" value="#396bf6">
            Blue
          </option>
          <option key="navy" value="#3e579c">
            Navy
          </option>
          <option key="white" value="#fff7f1">
            White
          </option>
          <option key="gray" value="#969696">
            Gray
          </option>
        </select>
      </div>
      <div>
        <button
          onClick={() => {
            axios({
              method: "POST",
              url: "https://us-central1-dontpanic-zerone.cloudfunctions.net/loginUser",
              data: {
                nickname: userName,
                slimeColor: userColor,
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
