import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import SaveButton from "./SaveButton";
import ImportDropzone from "./ImportDropzone";
import ObjectItem from "./ObjectItem";
import { v4 as uuidv4 } from "uuid";

const initialObjects = [
  { id: 1, label: "Table", left: 50, top: 50 },
  { id: 2, label: "Chair", left: 150, top: 150 },
  { id: 3, label: "Partition", left: 250, top: 250 },
];

export default function Board() {
  const [objects, setObjects] = useState(initialObjects);
  const [deleteMode, setDeleteMode] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "object",
    drop: (item, monitor) => {
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
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleImport = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const json = reader.result;
      const parsed = JSON.parse(json);
      setObjects(parsed);
    };
    reader.readAsText(acceptedFiles[0]);
  };

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

  return (
    <div>
      <div
        ref={drop}
        style={{
          width: "500px",
          height: "500px",
          border: "1px solid black",
          position: "relative",
        }}
      >
        {objects.map((obj) => (
          <ObjectItem
            key={obj.id}
            obj={obj}
            deleteMode={deleteMode}
            deleteObject={deleteObject}
          />
        ))}
      </div>
      <div>
        <button onClick={() => addObject("Table")}>Add Table</button>
        <button onClick={() => addObject("Chair")}>Add Chair</button>
        <button onClick={() => addObject("Partition")}>Add Partition</button>
        <button onClick={() => setDeleteMode(!deleteMode)}>
          {deleteMode ? "Cancel Delete" : "Delete Item"}
        </button>
        <SaveButton objects={objects} />
        <ImportDropzone onImport={handleImport} />
      </div>
    </div>
  );
}
