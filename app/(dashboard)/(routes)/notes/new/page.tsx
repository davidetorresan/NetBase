"use client";

import { Settings, StickyNote, Receipt, Gem } from "lucide-react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Heading } from "@/components/heading";
import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Select from "react-select";
import { log } from "console";

const NewNotesPage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();

  const [json, setJson] = useState({
    title: "",
    content: "",
    status: "",
    category: [
      {
        value: "",
        lable: "",
      },
    ],
  });

  const onEditorStateChange = function (data: any) {
    setEditorState(data);
    setJson({ ...json, content: data });
    const { blocks } = convertToRaw(data.getCurrentContent());
    let text = data.getCurrentContent().getPlainText("\u0001");
    setText(text);
  };

  async function handleSubmit() {
    console.log(json);

    let res = await axios.post("/api/notes", json);
  }

  const optionsStatus = [
    { value: "PUBLIC", label: "Pubblica" },
    { value: "PRIVATE", label: "Privata" },
    { value: "DRAFT", label: "Bozza" },
  ];

  const optionsCategory = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      <Heading
        title="Nuovo Appunto"
        description="Scrivi un nuovo appunto"
        icon={StickyNote}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8">
        <div className="rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm w-full">
          <h3 className="font-bold mb-1">Titolo</h3>
          <Input
            className="mb-4"
            placeholder="Inserisci il titolo della nota"
          />
          <h3 className="font-bold mb-1">Contenuto</h3>
          <div className="rounded-lg border p-4 px-3 md:px-6 focus-within:shadow-sm w-full mb-4 min-h-[200px]">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              editorStyle={{ height: "100%" }}
              onEditorStateChange={onEditorStateChange}
            />
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="w-1/3">
              <h3 className="font-bold mb-1">Categorie</h3>
              <Select
                isMulti
                name="colors"
                options={optionsCategory}
                defaultValue={optionsCategory[0]}
                className="basic-multi-select w-full mb-4"
                classNamePrefix="select"
              />
            </div>

            <div className="w-1/3">
              <h3 className="font-bold mb-1">Status</h3>
              <Select
                name="colors"
                options={optionsStatus}
                defaultValue={optionsStatus[2]}
                className="basic-multi-select w-full mb-4"
                classNamePrefix="select"
              />
            </div>
          </div>
          <Button
            onClick={() => handleSubmit}
            variant="default"
            className="w-full"
          >
            Save
          </Button>
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4 mt-10"></div>
    </div>
  );
};

export default NewNotesPage;
