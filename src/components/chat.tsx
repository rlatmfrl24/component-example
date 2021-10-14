import { SendBirdProvider, OpenChannel } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useRecoilValue } from "recoil";
import { userNameState } from "../store/basic";
require("dotenv").config();

export const Chat = () => {
  const userName = useRecoilValue(userNameState);

  return (
    <>
      <span>
        <SendBirdProvider
          appId={process.env.REACT_APP_CHAT_APP_ID!}
          userId={userName}
          theme="dark"
        >
          <div style={{ height: "90vh", marginTop: "1em" }}>
            <OpenChannel
              channelUrl={process.env.REACT_APP_CHAT_CHANNEL_URL!}
              disableUserProfile // to determine whether to display user profile on clicking userIcons,
              fetchingParticipants={false}
            />
          </div>
        </SendBirdProvider>
      </span>
    </>
  );
};
