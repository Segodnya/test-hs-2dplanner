import React, { useState } from "react";
import Board from "./Board";
import { v4 as uuidv4 } from "uuid";

const initialObjects = [
  { id: 1, label: "Стол", left: 50, top: 50 },
  { id: 2, label: "Стул", left: 150, top: 150 },
  { id: 3, label: "Перегородка", left: 250, top: 250 },
];

const BoardContainer = () => {
  const [objects, setObjects] = useState(initialObjects);
  const [deleteMode, setDeleteMode] = useState(false);

  const addObject = (label) => {
    const newObject = {
      id: uuidv4(),
      label,
      left: 0,
      top: 0,
    };
    setObjects([...objects, newObject]);
  };

  const deleteObject = (id) => {
    setObjects(objects.filter((obj) => obj.id !== id));
  };

  const handleImport = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result;
      const parsed = JSON.parse(json);
      setObjects(parsed);
    };
    reader.readAsText(acceptedFiles[0]);
  };

  const handleDrop = (item, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    const boardWidth = 500;
    const boardHeight = 500;
    const objectWidth = 50;
    const objectHeight = 50;
    const maxLeft = boardWidth - objectWidth;
    const maxTop = boardHeight - objectHeight;
    const newLeft = Math.min(Math.max(left, 0), maxLeft);
    const newTop = Math.min(Math.max(top, 0), maxTop);
    setObjects((prevObjects) =>
      prevObjects.map((obj) =>
        obj.id === item.id ? { ...obj, left: newLeft, top: newTop } : obj
      )
    );
    return undefined;
  };

  return (
    <Board
      objects={objects}
      deleteMode={deleteMode}
      addObject={addObject}
      deleteObject={deleteObject}
      handleImport={handleImport}
      handleDrop={handleDrop}
      setDeleteMode={setDeleteMode}
    />
  );
};

export default BoardContainer;
