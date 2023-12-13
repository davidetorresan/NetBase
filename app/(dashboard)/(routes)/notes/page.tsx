"use client";

import { Settings, StickyNote, Receipt, Gem } from "lucide-react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Heading } from "@/components/heading";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewNotesPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const onEditorStateChange = function (editorState: any) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    setText(text);
  };

  const [notes, setNotes] = useState([
    {
      id: "1",
      title: "TITOLO DELL'APPUNTO",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi et accusantium aspernatur sunt illum numquam odio fugiat magnam similique temporibus autem nemo mollitia officia, libero dolore saepe, nisi nostrum quia?",
    },
    {
      id: "2",
      title: "TITOLO DELL'APPUNTO 2",
      content:
        "Lorem ipsum dolor sit amet sdsaddfsdfsd consectetur adipisicing elit. Animi et accusantium aspernatur sunt illum numquam odio fugiat magnam magnamm agnamma gna mmagn ammag nam similique temporibus autem nemo mollitia officia, libero dolore saepe, nisi nostrum quia?",
    },
    {
      id: "3",
      title: "TITOLO DELL'APPUNTO 3",
      content:
        "Lorem ipsum dolor sit amet sdsaddfsdfsd consectetur adipisicing elit. Animi et accusantium aspernatur sunt illum numquam odio fugiat magnam magnamm agnamma gna mmagn ammag nam similique temporibus autem nemo mollitia officia, libero dolore saepe, nisi nostrum quia?",
    },
  ]);
  async function getNotes() {
    let data = {};
    //let res = await axios.post("/api/notes", data);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Heading
        title="Appunti"
        description="I tuoi appunti"
        icon={StickyNote}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
        hasNew
      />
      <div className="px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-4">
          {notes.length &&
            notes.map((note, i) => (
              <div key={i} className="w-full sm:w-full rounded-lg border p-4 hover:shadow-md pointer transition-shadow cursor-pointer duration-400">
                <h3 className="font-bold text-gray-500 text-[25px] mb-0">{note.title}</h3>
                <hr className="my-2" />
                <p className="text-gray text-[14px] font-light">
                  {note.content}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4 mt-10"></div>
    </div>
  );
};

export default NewNotesPage;
