import { SendBirdProvider, OpenChannel } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useRecoilValue } from "recoil";
import { userNameState } from "../store/basic";

export const Chat = () => {
  const userName = useRecoilValue(userNameState);

  return (
    <>
      <span>
        <SendBirdProvider
          appId="7F2B58EC-6AF2-463E-B837-84E0B88B593B"
          userId={userName}
          theme="dark"
        >
          <div style={{ height: "90vh", marginTop: "1em" }}>
            <OpenChannel
              channelUrl="sendbird_open_channel_3328_6b5729b27d1ebd3373e34396adad29b1d974a85c"
              disableUserProfile // to determine whether to display user profile on clicking userIcons,
              fetchingParticipants={false}
            />
          </div>
        </SendBirdProvider>
      </span>
    </>
  );
};
