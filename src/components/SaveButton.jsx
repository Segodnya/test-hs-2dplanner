import React from "react";
import { saveAs } from "file-saver";

const SaveButton = ({ objects }) => {
  const handleSave = () => {
    const json = JSON.stringify(objects);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "arrangement.json");
  };

  return <button onClick={handleSave}>Сохранить</button>;
};

export default SaveButton;
