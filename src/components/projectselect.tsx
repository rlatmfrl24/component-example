import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectListState, UserData, userDataState } from "../store/basic";
import { CodeShare } from "./codeshare";
import SendBirdCall from "sendbird-calls";

export const ProjectSelect = () => {
  const userData = useRecoilValue(userDataState) as UserData;
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [currentProjectId, setCurrentProjectId] = useState("");
  const localMediaView = document.getElementById("local_video_element_id");

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://us-central1-dontpanic-zerone.cloudfunctions.net/getProjectList?name=" +
        userData.nickname,
    })
      .then((response) => {
        setProjectList(response.data as any[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.nickname, setProjectList]);

  // Calls
  useEffect(() => {
    SendBirdCall.init(process.env.REACT_APP_CHAT_APP_ID!);

    const authOption = {
      userId: userData.nickname,
      accessToken: userData.sendbirdAccessToken,
    };

    SendBirdCall.authenticate(authOption, async (result, error) => {
      await SendBirdCall.connectWebSocket();
      const room = await SendBirdCall.fetchRoomById(
        "8aabf35f-3744-44fa-8f08-80b827722739"
      );
      await room.enter({ videoEnabled: true, audioEnabled: true });
      room.localParticipant.setMediaView(localMediaView as HTMLMediaElement);
      room.on("remoteParticipantStreamStarted", (remoteParticipant) => {
        const remoteMediaView = document.createElement("video");
        remoteMediaView.autoplay = true;
        remoteParticipant.setMediaView(remoteMediaView);
      });
    });
  }, [userData.nickname, userData.sendbirdAccessToken]);

  return (
    <div>
      <div>
        <video id="remote_video_element_id" autoPlay></video>
      </div>
      <div>
        <select
          name="project-select"
          onChange={(event) => {
            setCurrentProjectId(event.target.value);
          }}
        >
          <option value="">--Please choose an option--</option>
          {projectList.map((project) => {
            return (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {projectList.map((project) => {
          return (
            <div key={project.id}>
              {project.id === currentProjectId && <CodeShare id={project.id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
