import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { fromMonaco } from "@hackerrank/firepad";
import firebase from "firebase";

export const CodeShare = () => {
  const editorRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
    setEditorLoaded(true);
  }

  useEffect(() => {
    if (!editorLoaded) {
      // If editor is not loaded return
      return;
    }

    const dbRef = firebase.database().ref().child("pair001"); // Can be anything in param, use unique string for unique code session
    const firepad = fromMonaco(dbRef, editorRef.current!);
    const name = prompt("Enter your Name :"); // Name to highlight who is editing where in the code
    if (name) {
      firepad.setUserName(name);
    }
  }, [editorLoaded]);

  return (
    <div>
      <Editor
        height="90vh"
        width="30vw"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue="// Welcome to My Editor"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};
