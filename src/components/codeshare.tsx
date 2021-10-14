import firebase from "firebase";
import axios from "axios";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { fromMonaco } from "@hackerrank/firepad";
import { useRecoilValue, useRecoilState } from "recoil";
import { userNameState, projectListState } from "../store/basic";
require("dotenv").config();

export const CodeShare = () => {
  const userName = useRecoilValue(userNameState);
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [currentProjectId, setCurrentProjectId] = useState("");

  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);

  const [htmlEditorLoaded, setHtmlEditorLoaded] = useState(false);
  const [cssEditorLoaded, setCssEditorLoaded] = useState(false);
  const [jsEditorLoaded, setJsEditorLoaded] = useState(false);

  function handleHtmlEditorDidMount(editor: any, monaco: Monaco) {
    htmlEditorRef.current = editor;
    setHtmlEditorLoaded(true);
  }

  function handleCssEditorDidMount(editor: any, monaco: Monaco) {
    cssEditorRef.current = editor;
    setCssEditorLoaded(true);
  }

  function handleJsEditorDidMount(editor: any, monaco: Monaco) {
    jsEditorRef.current = editor;
    setJsEditorLoaded(true);
  }

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://us-central1-dontpanic-zerone.cloudfunctions.net/getProjectList?name=" +
        userName,
    })
      .then((response) => {
        setProjectList(response.data as any[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userName, setProjectList]);

  useEffect(() => {
    if (
      !htmlEditorLoaded ||
      !cssEditorLoaded ||
      !jsEditorLoaded ||
      currentProjectId === ""
    ) {
      // If editor is not loaded return
      return;
    }
    const projectDBRef = firebase.database().ref().child(currentProjectId);

    const htmlCodeDBRef = projectDBRef.child("html");
    const cssCodeDBRef = projectDBRef.child("css");
    const jsCodeDBRef = projectDBRef.child("js");

    const htmlFirePad = fromMonaco(htmlCodeDBRef, htmlEditorRef.current!);
    const cssFirePad = fromMonaco(cssCodeDBRef, cssEditorRef.current!);
    const jsFirePad = fromMonaco(jsCodeDBRef, jsEditorRef.current!);

    htmlFirePad.setUserName(userName);
    cssFirePad.setUserName(userName);
    jsFirePad.setUserName(userName);
  }, [
    htmlEditorLoaded,
    cssEditorLoaded,
    jsEditorLoaded,
    userName,
    currentProjectId,
  ]);

  return (
    <div>
      <div>
        <select
          id="select-project-list"
          name="project"
          onChange={async (event) => {
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
      <div style={{ width: "30vw", float: "left" }}>
        <Editor
          height="90vh"
          defaultLanguage="html"
          theme="vs-dark"
          defaultValue="// Welcome to My Editor"
          onMount={handleHtmlEditorDidMount}
        />
      </div>
      <div style={{ width: "30vw", float: "left" }}>
        <Editor
          height="90vh"
          defaultLanguage="css"
          theme="vs-dark"
          defaultValue="// Welcome to My Editor"
          onMount={handleCssEditorDidMount}
        />
      </div>
      <div style={{ width: "30vw", float: "left" }}>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          theme="vs-dark"
          defaultValue="// Welcome to My Editor"
          onMount={handleJsEditorDidMount}
        />
      </div>
    </div>
  );
};
