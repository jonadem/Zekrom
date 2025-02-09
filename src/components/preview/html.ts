import { useEffect, useState } from "react";
import { toHTML } from "markdown";
import { Editor } from "../../editor/type";

interface Params {
  editor: Editor;
}

export const usePreviewHtml = (params: Params): string => {
  const { editor } = params;

  const [html, setHtml] = useState("");

  useEffect(() => {
    // Set initial value
    toHTML(editor.getValue()).then((text) => setHtml(text));

    // Listen for changes
    const handler = async () => {
      const markdownVar = editor.getValue();
      const html = await toHTML(markdownVar);
      setHtml(html);
    };
    const listeners = [
      editor.onDidChangeModelContent(handler),
      editor.onDidChangeModel(handler), // Open new file
    ];
    return () => listeners.forEach((l) => l.dispose());
  }, [editor]);

  return html;
};
