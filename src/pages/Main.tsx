import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState, componentState } from "../store/basic";
import { Login } from "../components/login";
import { Chat } from "../components/chat";
import { CodeShare } from "../components/codeshare";

const Component = () => {
  const componentName = useRecoilValue(componentState);

  switch (componentName) {
    case "chat":
      return <Chat />;
    case "codeshare":
      return <CodeShare />;
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
