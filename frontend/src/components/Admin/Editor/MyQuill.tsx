// components/MyQuill.tsx
type MyQuillProps = {
  value: string;
  onChange: (value: string) => void;
  modules?: {
    toolbar?: {
      container?: unknown;
      handlers?: Record<string, (...args: unknown[]) => void>;
    };
  };
  formats?: string[];
  theme?: string;
  style?: React.CSSProperties;
};
import React, { forwardRef } from "react";
import ReactQuill from "react-quill-new";

const MyQuill = forwardRef<ReactQuill, MyQuillProps>((props, ref) => {
  return <ReactQuill {...props} ref={ref} />;
});

MyQuill.displayName = "MyQuill";

export default MyQuill;
