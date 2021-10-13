import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { loginState, componentState } from "../store/basic";
import { Login } from "../components/login";
import { Chat } from "../components/chat";

const Component = () => {
  const componentName = useRecoilValue(componentState);

  switch (componentName) {
    case "chat":
      return <Chat />;
    case "codeshare":
      return <></>;
    default:
      return <></>;
  }
};

export const Main = () => {
  const isLogin = useRecoilValue(loginState);
  const setComponentName = useSetRecoilState(componentState);
  return (
    <>
      {isLogin ? (
        <>
          <div>
            <button
              onClick={() => {
                setComponentName("chat");
              }}
            >
              chat example
            </button>
            <span> </span>
            <button
              onClick={() => {
                setComponentName("codeshare");
              }}
            >
              code share example
            </button>
          </div>
          <div>
            <Component />
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
