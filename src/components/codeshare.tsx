import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { fromMonaco } from "@hackerrank/firepad";
import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { userNameState } from "../store/basic";
require("dotenv").config();

export const CodeShare = () => {
  const userName = useRecoilValue(userNameState);

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

  useEffect(() => {
    if (!htmlEditorLoaded || !cssEditorLoaded || !jsEditorLoaded) {
      // If editor is not loaded return
      return;
    }
    const htmlCodeDBRef = firebase.database().ref().child("pair001");
    const cssCodeDBRef = firebase.database().ref().child("pair002");
    const jsCodeDBRef = firebase.database().ref().child("pair003");

    const htmlFirePad = fromMonaco(htmlCodeDBRef, htmlEditorRef.current!);
    const cssFirePad = fromMonaco(cssCodeDBRef, cssEditorRef.current!);
    const jsFirePad = fromMonaco(jsCodeDBRef, jsEditorRef.current!);

    htmlFirePad.setUserName(userName);
    cssFirePad.setUserName(userName);
    jsFirePad.setUserName(userName);
  }, [htmlEditorLoaded, cssEditorLoaded, jsEditorLoaded, userName]);

  return (
    <div>
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
