import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectListState, userCoreState } from "../store/basic";
import { CodeShare } from "./codeshare";

export const ProjectSelect = () => {
  const userData = useRecoilValue(userCoreState);
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [currentProjectId, setCurrentProjectId] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://us-central1-dontpanic-zerone.cloudfunctions.net/getProjectList?name=" +
        userData.name,
    })
      .then((response) => {
        setProjectList(response.data as any[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.name, setProjectList]);

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
