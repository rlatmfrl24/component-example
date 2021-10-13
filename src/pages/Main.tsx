import { useRecoilValue } from "recoil";
import { loginState } from "../store/basic";
import { Login } from "../components/login";

export const Main = () => {
  const isLogin = useRecoilValue(loginState);

  return (
    <>
      {isLogin ? (
        <>
          <div>
            <button>chat example</button>
            <span> </span>
            <button>code share example</button>
          </div>
          <div></div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
