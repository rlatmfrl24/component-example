import { SendBirdProvider, OpenChannel } from "sendbird-uikit";
import { useRecoilValue } from "recoil";
import { UserData, userDataState } from "../store/basic";
import "sendbird-uikit/dist/index.css";
require("dotenv").config();

export const Chat = () => {
  const userData = useRecoilValue(userDataState) as UserData;

  return (
    <>
      <span>
        <SendBirdProvider
          appId={process.env.REACT_APP_CHAT_APP_ID!}
          userId={userData.nickname}
          accessToken={userData.sendbirdAccessToken}
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
