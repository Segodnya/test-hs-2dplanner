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
      <p>Переместите сюда JSON-файл или кликните, чтобы выбрать файл</p>
    </div>
  );
};

export default ImportDropzone;
