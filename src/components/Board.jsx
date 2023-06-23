import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";

const initialObjects = [
  { id: 1, label: "Table", left: 50, top: 50 },
  { id: 2, label: "Chair", left: 150, top: 150 },
  { id: 3, label: "Partition", left: 250, top: 250 },
];

const Board = () => {
  const [objects, setObjects] = useState(initialObjects);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "object",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.id === item.id ? { ...obj, left, top } : obj
        )
      );
      return undefined;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSave = () => {
    const json = JSON.stringify(objects);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "arrangement.json");
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

  const Object = ({ obj }) => {
    const [{ opacity }, drag] = useDrag(() => ({
      type: "object",
      item: {
        id: obj?.id,
        label: obj?.label,
        left: obj?.left + 25,
        top: obj?.top + 25,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }));
    return (
      <div
        ref={drag}
        style={{
          position: "absolute",
          left: obj.left,
          top: obj.top,
          border: "1px solid black",
          width: "50px",
          height: "50px",
          cursor: "move",
          opacity,
        }}
      >
        {obj.label}
      </div>
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImport,
    accept: "application/json",
  });

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
          <Object key={obj.id} obj={obj} />
        ))}
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop a JSON file here, or click to select a file</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
