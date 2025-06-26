"use client";

import dynamic from "next/dynamic";
import React, { useMemo, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import axiosInstance from "@/app/utils/axiosInstance";

// ✅ dynamic import component đã được forwardRef
const ReactQuill = dynamic(() => import("./MyQuill"), { ssr: false });

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axiosInstance.post("/upload", formData);
        const imageUrl = res.data.url;

        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();

        if (range) {
          editor.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (error) {
        console.error("Lỗi upload ảnh:", error);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "align",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      style={{ height: "300px" }}
    />
  );
};

export default Editor;
