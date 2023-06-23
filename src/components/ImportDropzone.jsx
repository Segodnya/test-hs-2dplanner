import React from "react";
import { useDropzone } from "react-dropzone";

const ImportDropzone = ({ onImport }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onImport,
    accept: "application/json",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop a JSON file here, or click to select a file</p>
    </div>
  );
};

export default ImportDropzone;
