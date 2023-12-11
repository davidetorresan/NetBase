"use client";

import { Settings, StickyNote, Receipt, Gem } from "lucide-react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Heading } from "@/components/heading";
import { useState } from "react";

const NotesPage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div>
      <Heading
        title="Appunti"
        description="I tuoi appunti"
        icon={StickyNote}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8">
        <div
          className="rounded-lg 
              border 
              p-4 
              px-3 
              md:px-6 
              focus-within:shadow-sm w-full"
        >
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4 mt-10"></div>
    </div>
  );
};

export default NotesPage;
