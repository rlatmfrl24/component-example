import { SendBirdProvider, OpenChannel } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useRecoilValue } from "recoil";
import { userCoreState } from "../store/basic";
require("dotenv").config();

export const Chat = () => {
  const userData = useRecoilValue(userCoreState);

  return (
    <>
      <span>
        <SendBirdProvider
          appId={process.env.REACT_APP_CHAT_APP_ID!}
          userId={userData.name}
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
