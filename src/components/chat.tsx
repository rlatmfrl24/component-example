import { SendBirdProvider, OpenChannel } from "sendbird-uikit";
import { useRecoilValue } from "recoil";
import { UserData, userDataState } from "../store/basic";
import "sendbird-uikit/dist/index.css";
require("dotenv").config();

export const Chat = () => {
  const userData = useRecoilValue(userDataState) as UserData;

  console.log(userData.nickname);
  console.log(process.env.REACT_APP_CHAT_APP_ID!);
  console.log(process.env.REACT_APP_CHAT_CHANNEL_URL!);
  return (
    <>
      <span>
        <SendBirdProvider
          appId={process.env.REACT_APP_CHAT_APP_ID!}
          userId="soulkey"
          accessToken="f5d3469f5fa46891e62e4123772d459ce24fded2"
          theme="dark"
        >
          <div style={{ height: "90vh", marginTop: "1em" }}>
            <OpenChannel
              channelUrl={process.env.REACT_APP_CHAT_CHANNEL_URL!}
              fetchingParticipants={false}
            />
          </div>
        </SendBirdProvider>
      </span>
    </>
  );
};
