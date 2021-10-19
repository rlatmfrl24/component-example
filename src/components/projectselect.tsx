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
  // SendBirdCall.init(process.env.REACT_APP_CHAT_APP_ID!);

  // const authOption = {
  //   userId: "soulkey",
  //   accessToken: "f5d3469f5fa46891e62e4123772d459ce24fded2",
  // };

  // SendBirdCall.authenticate(authOption, (result, error) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(result);
  //   }
  //   SendBirdCall.connectWebSocket()
  //     .then(() => {})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  return (
    <div>
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
